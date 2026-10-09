import Document, { Html, Head, Main, NextScript, type DocumentContext, type DocumentInitialProps } from 'next/document';
import { randomBytes } from 'node:crypto';

export default class WebsiteDocument extends Document<DocumentInitialProps & { nonce?: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const props = await Document.getInitialProps(ctx);
    // Dynamic HTML receives a fresh nonce; static error documents use the baseline headers.
    const nonce = ctx.res && process.env.NODE_ENV === 'production' ? randomBytes(24).toString('base64') : undefined;
    if (nonce) ctx.res!.setHeader('Content-Security-Policy', [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}'`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://api.emailjs.com https://*.blob.vercel-storage.com https://blob.vercel-storage.com",
      "frame-src https://www.google.com",
      "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
    ].join('; '));
    return { ...props, nonce };
  }
  render() {
    return <Html lang="en" className="scroll-smooth" data-scroll-behavior="smooth"><Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    </Head><body className="bg-[#f6faff] text-[#0b1d29] antialiased"><Main /><NextScript nonce={this.props.nonce} /></body></Html>;
  }
}
