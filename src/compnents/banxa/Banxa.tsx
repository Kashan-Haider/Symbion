import React from 'react';
import SmallHeading from '../../ui/SmallHeading';
import Heading from '../../ui/Heading';

const Banxa = () => {
  return (
    <div className='px-5 md:px-10' >
      <Heading>
      Don't have enought ehters
    </Heading>
    <iframe
    className='h-screen my-5'
      height="1000"
      width="500"
      src = "https://or1.banxa.com/papi/transit/?initId=eyJpdiI6ImlZVzRuaFlNQW0zbmxNK0xVcWRHZHc9PSIsInZhbHVlIjoia3JQQ1hRbjFlaGhMVTMrcHBFbGFrTXRha21MRXIxQ29SeEJYQlNTcE15T21iY25kRVIycGNnTHFaU0Vxc2oxaSthMkN3MTRKeHRGRHJwM2M0YllxcWJvazhBd2tSYVgyM0NBVFk3MG1sSmtMNTZwRHJ5akV3UVBsaDNIbWpGYmdTRk00M1h5VHNRdTV0YmNTcFZQNm5YcFVTa1BJNStzczAwaTBDUGI5Z3Z2M2xmQ3RTV25MMkJFZGJZYWpyY2ppck1FSmU0V1RwMGZFWC9tcWFaZmNyK2dvenNjSGxsck1aNTRoU0locTdhdmlmM05tdjlsNFhsK3RDc04zU0hURm9BSnpNckxMZW5yeWI2Z0xRTjU3eUxqU0xrMzBkTHY4c092ZXBQRVh0T1hsRENNcVhyNUFyU2tFRlVnd1NFSjZZNnBIRzV6N1B3SDkxc0h5NDRPY2pWVnErLzBWeGRJWjlBTGhhaThIS253WHZZZ25ReTFRRmNEOTRJb28rSTg1c2JKS2pTQi9OT2tSRkw2aW1xSDhsQT09IiwibWFjIjoiYmUyMTMwMjU0NDExNzEyYTk3ZDQxNGEwYmI3OGY1NDhjNjJmNjczMTA3NjU5YTg5MmE0NTIxZjU4NjEwODFlMCIsInRhZyI6IiJ9"
      title="Onramp service"
    />
    </div>
  );
};

export default Banxa;
