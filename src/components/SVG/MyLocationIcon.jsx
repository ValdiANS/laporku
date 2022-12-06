const MyLocationIcon = ({ className = '' }) => (
  <svg
    className={className}
    width='25'
    height='25'
    viewBox='0 0 25 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect x='10' width='4' height='25' rx='2' fill='white' />
    <rect
      y='14'
      width='4'
      height='25'
      rx='2'
      transform='rotate(-90 0 14)'
      fill='white'
    />
    <circle cx='12.5' cy='12.5' r='7' fill='#D9D9D9' stroke='white' />
    <circle cx='12.5' cy='12.5' r='4.5' fill='white' />
  </svg>
);

export default MyLocationIcon;
