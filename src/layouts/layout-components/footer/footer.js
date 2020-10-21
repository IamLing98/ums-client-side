import React from 'react';


class Footer extends React.Component {
  render() {
    return (
      <footer className="footer text-center">

          Phuong Dong University. © {new Date().getFullYear()}
          {". "}All Rights Reserved. <a href="http://phuongdong.edu.vn/" target="blank">PDU</a>

      </footer>
    );
  }
}
export default Footer;
