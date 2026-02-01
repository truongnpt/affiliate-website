import { appConfig } from "@/config/app.config";

export const contactFormTemplate = (name: any, email: any, message: any) => {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Liên hệ mới - ${appConfig.name}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #eb7b0b 0%, #f08b19 100%); padding: 32px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                    Liên hệ mới
                  </h1>
                  <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.95;">
                    ${appConfig.name}
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <!-- Name Section -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 16px; background-color: #FFF8F0; border-left: 4px solid #eb7b0b; border-radius: 6px;">
                        <p style="margin: 0 0 8px 0; color: #eb7b0b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Tên người gửi
                        </p>
                        <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 500; line-height: 1.5;">
                          ${name}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Email Section -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 16px; background-color: #FFF8F0; border-left: 4px solid #eb7b0b; border-radius: 6px;">
                        <p style="margin: 0 0 8px 0; color: #eb7b0b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Email
                        </p>
                        <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 500; line-height: 1.5;">
                          <a href="mailto:${email}" style="color: #eb7b0b; text-decoration: none;">${email}</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Message Section -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding: 16px; background-color: #FFF8F0; border-left: 4px solid #eb7b0b; border-radius: 6px;">
                        <p style="margin: 0 0 8px 0; color: #eb7b0b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Nội dung tin nhắn
                        </p>
                        <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6;">
                          ${message}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; text-align: center;">
                  <p style="margin: 0; color: #666666; font-size: 12px; line-height: 1.5;">
                    Email này được gửi tự động từ hệ thống liên hệ của <strong style="color: #eb7b0b;">${appConfig.name}</strong>
                  </p>
                  <p style="margin: 8px 0 0 0; color: #999999; font-size: 11px;">
                    © ${new Date().getFullYear()} ${appConfig.name} - ${appConfig.tagline}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};