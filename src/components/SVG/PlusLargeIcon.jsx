const PlusLargeIcon = ({ className = '' }) => (
  <svg
    className={className}
    width='28'
    height='28'
    viewBox='0 0 28 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect x='11' width='6' height='28' rx='3' fill='white' />
    <rect
      y='17'
      width='6'
      height='28'
      rx='3'
      transform='rotate(-90 0 17)'
      fill='white'
    />
  </svg>
);

export default PlusLargeIcon;
