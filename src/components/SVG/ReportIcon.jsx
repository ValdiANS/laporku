const ReportIcon = ({ className = '' }) => (
  <svg
    className={className}
    width='36'
    height='36'
    viewBox='0 0 36 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='18' cy='8' r='5' fill='white' />
    <circle cx='18' cy='30' r='3' fill='white' />
    <circle cx='18' cy='18' r='17.5' stroke='white' />
    <path d='M18 25L23 8.5H13L18 25Z' fill='white' />
  </svg>
);

export default ReportIcon;
