import React from "react";

export function EmailFooter() {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 22 }}>
      <tr>
        <td style={{ fontFamily: 'Trebuchet MS, Arial, sans-serif', color: '#d9e64e', fontSize: 16, lineHeight: 1.5 }}>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: '#d9e64e' }}>
            Isaac Longoria
          </div>
          <div style={{ color: '#374151', marginTop: 2 }}>
            Founder | RiverCity Creatives
          </div>
          <div style={{ marginTop: 6, color: '#374151' }}>
            <div style={{ marginBottom: 4 }}>
              🌐
              <a href="https://rivercitycreatives.com" style={{ color: '#2563eb', textDecoration: 'none' }}>
                rivercitycreatives.com
              </a>
            </div>
            <div>
              📞 (210) 730-6232
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <img
              src="https://rivercitycreatives.com/logo-rivercity-creatives-horizontal-green-gradient.png"
              alt="RiverCity Creatives Logo"
              style={{ maxWidth: 100, height: 'auto', display: 'block' }}
            />
          </div>
        </td>
      </tr>
    </table>
  );
}
