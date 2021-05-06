import Link from 'next/link'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  .footer-content {
    padding: 92px 135px 114px 135px;
    background: #282b49;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;

    @media screen and (max-width: 768px) {
      flex-direction: column-reverse;
      padding: 60px 20px;
    }

    &-left {
      width: 60%;
      display: flex;
      flex-direction: row;

      @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
        width: 100%;
      }
    }

    &-right {
      width: 30%;
      display: flex;
      flex-direction: row;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }

    &-section {
      display: flex;
      flex-direction: column;
      flex: 1;

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #fff;
      }

      @media screen and (max-width: 768px) {
        align-items: center;
      }

      &.social {
        @media screen and (max-width: 768px) {
          flex-direction: row;
          justify-content: center;
          margin-top: 40px;
        }

        .footer-content-section-title {
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }

      &-title {
        margin-bottom: 21px;
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;

        @media screen and (max-width: 768px) {
          font-size: 14px;
          line-height: 17px;
        }
      }

      &.get-in-touch {
        @media screen and (max-width: 768px) {
          margin-top: 30px;
          text-align: center;
        }
      }

      &.info {
        img {
          display: none;

          @media screen and (max-width: 768px) {
            display: block;
          }
        }

        div {
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }

      &.legal {
        @media screen and (max-width: 768px) {
          display: none;
        }
      }

      p {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #d0d0d0;

        @media screen and (max-width: 768px) {
          font-size: 12px;
          line-height: 15px;
        }
      }
    }

    &-link {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #d0d0d0;
      text-decoration: none;
      padding-bottom: 28px;

      @media screen and (max-width: 768px) {
        font-size: 14px;
        line-height: 17px;
      }
    }

    &-social {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      @media screen and (max-width: 768px) {
        margin: 10px;
      }

      img {
        border-radius: 13px;
      }

      span {
        padding-left: 10px;
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;

        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
  }

  .footer-copyright {
    background: #1c1e35;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;

    &-text {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 0.5px;
      color: #ffffff;
      opacity: 0.4;
      text-decoration: none;

      @media screen and (max-width: 768px) {
        font-size: 10px;
        line-height: 24px;
      }
    }
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="footer-content-section social">
            <img
              className="footer-content-section-title"
              src="/static/images/logo/logo-white.png"
              width="110"
              alt=""
            />
            <div className="footer-content-social">
              <a
                href="https://twitter.com/dropsnft"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="26"
                  height="26"
                  src="/static/images/social/twitter.png"
                  alt=""
                />{' '}
                <span>Twitter</span>
              </a>
            </div>
            <div className="footer-content-social">
              <a
                href="https://t.me/drops_nft"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="26"
                  height="26"
                  src="/static/images/social/telegram.png"
                  alt=""
                />{' '}
                <span>Telegram</span>
              </a>
            </div>
            <div className="footer-content-social">
              <a
                href="https://discord.gg/FqZKAs6pmD"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="26"
                  height="26"
                  src="/static/images/social/discord.png"
                  alt=""
                />{' '}
                <span>Discord</span>
              </a>
            </div>
            <div className="footer-content-social">
              <a
                href="https://github.com/dropsnft"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="26"
                  height="26"
                  src="/static/images/social/github.png"
                  alt=""
                />{' '}
                <span>Github</span>
              </a>
            </div>
          </div>
          <div className="footer-content-section get-in-touch">
            <div className="footer-content-section-title">Get in touch</div>
            <a href="mailto:info@drops.is">info@drops.co</a>
            {/* <p>Address lorem ipsum dolo sit amet pratas<br />lhadala malah penak tenan</p> */}
          </div>
        </div>
        <div className="footer-content-right">
          {/* <div className="footer-content-section info">
            <img className="footer-content-section-title" src="/static/images/logo/logo-white.png" width="109" height="23" alt="" />
            <div className="footer-content-section-title" >Info</div>
            <Link to="/" className="footer-content-link">Home</Link>
            <Link to="/" className="footer-content-link">Stake & earn</Link>
            <Link to="/" className="footer-content-link">Drop</Link>
            <Link to="/" className="footer-content-link">My Wallet</Link>
          </div> */}
          <div className="footer-content-section legal">
            <div className="footer-content-section-title">Legal</div>
            <Link href="/" className="footer-content-link">
              Terms of Use
            </Link>
            <Link href="/" className="footer-content-link">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        {/* <Link to="/" className="footer-copyright-text">Privacy policy</Link> */}
        <span className="footer-copyright-text">© {new Date().getFullYear()}. DROPS</span>
        {/* <Link to="/" className="footer-copyright-text">Term of use</Link> */}
      </div>
    </FooterWrapper>
  )
}

export default Footer
