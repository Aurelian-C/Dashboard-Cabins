import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // You can assign metadata to users on sign up. User metadata is stored on the raw_user_meta_data column of the auth.users table.
    options: {
      data: {
        // in the data object, we can pass in any kind of information that we want about the user
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

// If user is already authenticated, get the JSON object for the logged in user
export async function getCurrentUser() {
  // 1. Get the user credentials from local storage
  const { data: session, error } = await supabase.auth.getSession(); // this method retrieves the current local session (i.e local storage).
  if (!session.session) return null;

  // 2. If there is a session on the local storage, get (re-fetch) the user credential from Supabase.
  // You might think that we could just get the user credentials from the local storage. While that is true, it is a bit more secure to just redownload everything from Supabase
  const { data } = await supabase.auth.getUser(); //

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
