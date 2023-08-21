import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded!');
  }

  return data;
}

// The createEditCabin has two purposes: to create & to edit a cabin
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // We use Math.random() because images names must be unique
  // If the image name contains any / (slash), then Supabase will create folders based on that /, so we need to replace all / with ''
  // prettier-ignore
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit a cabin
  let query = supabase.from('cabins');

  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created!');
  }

  // If the form has no image attached, return data and don't upload any image
  if (hasImagePath) return data;

  // 2. Upload an image to the Supabase cabin's bucket only if there's no error in creating or editing a cabin
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created!'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted!');
  }

  return data;
}
