

export const ExportUp = ({ fill = '#10295A' }: { fill?: string }) => {
  return (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.9974 4.00391H9.9974C9.11334 4.00391 8.26549 4.3551 7.64037 4.98022C7.01525 5.60534 6.66406 6.45318 6.66406 7.33724V34.0039C6.66406 34.888 7.01525 35.7358 7.64037 36.3609C8.26549 36.986 9.11334 37.3372 9.9974 37.3372H29.9974C30.8815 37.3372 31.7293 36.986 32.3544 36.3609C32.9795 35.7358 33.3307 34.888 33.3307 34.0039V12.3372L24.9974 4.00391Z"
        stroke={fill}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.3359 4.00391V10.6706C23.3359 11.5546 23.6871 12.4025 24.3122 13.0276C24.9374 13.6527 25.7852 14.0039 26.6693 14.0039H33.3359"
        stroke={fill}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 20.6719V30.6719"
        stroke={fill}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25 25.6719L20 20.6719L15 25.6719"
        stroke={fill}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
