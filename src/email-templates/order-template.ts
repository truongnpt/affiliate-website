import { appConfig } from "@/config/app.config";

export type OrderEmailData = {
  orderId: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
  total: number;
  paymentMethod: string;
  items: Array<{
    product_name: string;
    product_image: string;
    product_url: string;
    price: number;
    discount?: number;
    quantity: number;
  }>;
  createdAt?: string;
};

export const orderTemplate = (orderData: OrderEmailData) => {
  const {
    orderId,
    fullName,
    phone,
    email,
    address,
    note,
    total,
    paymentMethod,
    items,
    createdAt,
  } = orderData;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleString("vi-VN");
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const getPaymentMethodText = (method: string) => {
    if (method === "cod") return "Thanh toán khi nhận hàng (COD)";
    return method;
  };

  const itemsHtml = items
    .map((item) => {
      const itemPrice = item.discount
        ? Math.round(item.price * (1 - item.discount / 100))
        : item.price;
      const itemTotal = itemPrice * item.quantity;

      return `
        <tr>
          <td style="padding: 16px; border-bottom: 1px solid #e5e5e5;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td width="80" style="padding-right: 16px; vertical-align: top;">
                  <img 
                    src="${item.product_image}" 
                    alt="${item.product_name}"
                    style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e5e5;"
                    onerror="this.src='https://via.placeholder.com/200'"
                  />
                </td>
                <td style="vertical-align: top;">
                  <p style="margin: 0 0 8px 0; font-weight: 600; color: #333333; font-size: 15px; line-height: 1.4;">
                    ${item.product_name}
                  </p>
                  <p style="margin: 0 0 4px 0; color: #666666; font-size: 13px;">
                    Số lượng: <strong>${item.quantity}</strong>
                  </p>
                  <p style="margin: 0; color: #666666; font-size: 13px;">
                    ${item.discount ? `<span style="text-decoration: line-through; color: #999;">${formatPrice(item.price)}đ</span> <span style="color: #eb7b0b; font-weight: 600;">${formatPrice(itemPrice)}đ</span>` : `<span style="color: #333; font-weight: 600;">${formatPrice(item.price)}đ</span>`}
                  </p>
                </td>
                <td width="120" style="text-align: right; vertical-align: top;">
                  <p style="margin: 0; font-weight: 700; color: #eb7b0b; font-size: 16px;">
                    ${formatPrice(itemTotal)}đ
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join("");

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Đơn hàng mới #${orderId} - ${appConfig.name}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="700" style="max-width: 700px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #eb7b0b 0%, #f08b19 100%); padding: 32px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                    Đơn hàng mới
                  </h1>
                  <p style="margin: 12px 0 0 0; color: #ffffff; font-size: 18px; font-weight: 600; opacity: 0.95;">
                    Mã đơn: #ORD${orderId}
                  </p>
                  <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                    ${appConfig.name}
                  </p>
                </td>
              </tr>
              
              <!-- Order Info -->
              <tr>
                <td style="padding: 32px 40px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                          Thời gian đặt hàng
                        </p>
                        <p style="margin: 4px 0 0 0; color: #333333; font-size: 15px; font-weight: 500;">
                          ${formatDate(createdAt)}
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- Customer Info -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 20px; background-color: #FFF8F0; border-left: 4px solid #eb7b0b; border-radius: 6px;">
                        <p style="margin: 0 0 16px 0; color: #eb7b0b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Thông tin khách hàng
                        </p>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                              <strong style="color: #666; min-width: 100px; display: inline-block;">Họ và tên:</strong>
                              <span style="font-weight: 500;">${fullName}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                              <strong style="color: #666; min-width: 100px; display: inline-block;">Số điện thoại:</strong>
                              <a href="tel:${phone}" style="color: #eb7b0b; text-decoration: none; font-weight: 500;">${phone}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                              <strong style="color: #666; min-width: 100px; display: inline-block;">Email:</strong>
                              <a href="mailto:${email}" style="color: #eb7b0b; text-decoration: none; font-weight: 500;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                              <strong style="color: #666; min-width: 100px; display: inline-block;">Địa chỉ:</strong>
                              <span style="font-weight: 500;">${address}</span>
                            </td>
                          </tr>
                          ${note ? `
                          <tr>
                            <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                              <strong style="color: #666; min-width: 100px; display: inline-block;">Ghi chú:</strong>
                              <span style="font-weight: 500;">${note}</span>
                            </td>
                          </tr>
                          ` : ""}
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Order Items -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                    <tr>
                      <td style="padding-bottom: 12px;">
                        <p style="margin: 0; color: #eb7b0b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Sản phẩm đã đặt (${totalItems} sản phẩm)
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          ${itemsHtml}
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Payment & Total -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="padding: 8px 0; color: #666666; font-size: 14px;">
                              <strong>Phương thức thanh toán:</strong>
                            </td>
                            <td style="text-align: right; padding: 8px 0; color: #333333; font-size: 14px; font-weight: 500;">
                              ${getPaymentMethodText(paymentMethod)}
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" style="padding: 12px 0 0 0; border-top: 2px solid #e5e5e5;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td style="padding: 8px 0 0 0;">
                                    <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 600;">
                                      Tổng cộng:
                                    </p>
                                  </td>
                                  <td style="text-align: right; padding: 8px 0 0 0;">
                                    <p style="margin: 0; color: #eb7b0b; font-size: 24px; font-weight: 700;">
                                      ${formatPrice(total)}đ
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; text-align: center;">
                  <p style="margin: 0; color: #666666; font-size: 12px; line-height: 1.5;">
                    Email này được gửi tự động từ hệ thống đặt hàng của <strong style="color: #eb7b0b;">${appConfig.name}</strong>
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

