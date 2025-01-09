export default function Star({ fillColor }) {
  return (
    <>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9995 3L14.3495 8.76L20.5595 9.22L15.7995 13.24L17.2895 19.28L11.9995 16L6.70945 19.28L8.19945 13.24L3.43945 9.22L9.64945 8.76L11.9995 3Z"
          fill={fillColor}
        />
        <path
          d="M11.9995 3L9.64945 8.76L3.43945 9.22L8.19945 13.24L6.70945 19.28L11.9995 16M11.9995 3L14.3495 8.76L20.5595 9.22L15.7995 13.24L17.2895 19.28L11.9995 16"
          stroke={fillColor || 'black'}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
}
