import Breadcrumbs from '@mui/material/Breadcrumbs';
import './breadcrumb.css';
import PropTypes from "prop-types";

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      lastPage: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export function Breadcrumb({ items }) {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" separator="/" className='mt-2 mb-3'>
        {items.map((item) => (
          <a className={item.lastPage == false ? 'breadcrumb-container' : 'breadcrumb-negrito'}
            href={item.lastPage == false ? item.href : '#'} 
            key={item.href}>
            {item.title}
          </a>
        ))}
      </Breadcrumbs>
    </>
  );
}