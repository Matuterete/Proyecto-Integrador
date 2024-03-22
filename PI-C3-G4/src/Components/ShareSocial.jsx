import React from "react";
import { InlineShareButtons } from 'sharethis-reactjs';

class ShareSocial extends React.Component {
  render() {
    const { url, image, nombre } = this.props;

    return (
      <div>
        <style dangerouslySetInnerHTML={{__html: `
          html, body {
            margin: 0;
            padding: 0;
            text-align: center;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
          }
          hr {
            margin-bottom: 40px;
            margin-top: 40px;
            width: 50%;
          }
        `}} />
        <InlineShareButtons
          config={{
            alignment: 'center',
            color: 'social',
            enabled: true,
            font_size: 16,
            labels: 'null',
            language: 'es',
            networks: [
              'whatsapp',
              'linkedin',
              'messenger',
              'facebook',
              'twitter',
            ],
            padding: 10,
            radius: 4,
            size: 30,
            url: `${image}`,
          }}
        />
      </div>
    );
  }
}

export default ShareSocial;
