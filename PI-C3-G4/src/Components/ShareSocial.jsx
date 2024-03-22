import React from "react";
import {InlineShareButtons} from 'sharethis-reactjs';

/* para mas redes sociales validar componente sharethis 

 https://www.npmjs.com/package/sharethis-reactjs
              'whatsapp',
              'linkedin',
              'messenger',
              'facebook',
              'twitter',
              'blogger',
              'digg'
 */

class ShareSocial extends React.Component {
 
// Get the URL and title of the current page dynamically


  render () {
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
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'null',        // button labels (cta, counts, null)
            language: 'es',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)

              'whatsapp',
              'linkedin',
              'messenger',
              'facebook',
              'twitter',
            ],
            padding: 10,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            size: 30,             // the size of each button (INTEGER)


            // Parametros por defecto, se debe tener una URL publica valida para que funcionen las redes sociales (facebook, instagram, ETC)

            /*URL concatenada para enviar mensaje por wsp. no funciona para las demas redes sociales por la forma del encabezado y la url local*/

            /*Para Whastapp comentariar la linea 72 y quitar el comentario de la 69.*/

           //url: typeof window !== "undefined" ? 'Hola te quiero compartir este producto - '+` ${nombre} ` + 'http://localhost:5173/'+ `${url}` : undefined,    
            
           // url: `${url}`,
           url: `${image}`, //url de la imagen, para probar el encabezado
           //url url: 'www.google.com', // (defaults to current url)
           // image: `${image}`,  // (defaults to og:image or twitter:image)
           // description: 'custom text',       // (defaults to og:description or twitter:description)
           // title: 'custom title',            // (defaults to og:title or twitter:title)
           // message: 'custom email text',     // (only for email sharing)
           // subject: 'custom email subject',  // (only for email sharing)
           // username: 'custom twitter handle', // (only for twitter sharing)

          }}
        />
     </div> 

     
    );
  }
}


 
// export
export default ShareSocial;