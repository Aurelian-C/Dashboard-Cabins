import classes from './Table.module.css';
import { useContext, createContext } from 'react';

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={columns}>
      <div className={classes.table} role="table">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const columns = useContext(TableContext);
  return (
    <header
      className={classes.table__header}
      style={{ gridTemplateColumns: columns }}
      role="row"
    >
      {children}
    </header>
  );
}

function Row({ children }) {
  const columns = useContext(TableContext);
  return (
    <div
      className={classes['table__row--styled']}
      style={{ gridTemplateColumns: columns }}
      role="row"
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length) {
    return <p className={classes.empty}>No data to show at the moment!</p>;
  }

  return (
    <section className={classes.table__section}>{data.map(render)}</section>
  );
}

function Footer({ children }) {
  return <footer className={classes.table__footer}>{children}</footer>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
