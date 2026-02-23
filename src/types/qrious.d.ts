declare module "qrious" {
  interface QRiousOptions {
    background?: string;
    foreground?: string;
    level?: "L" | "M" | "Q" | "H";
    padding?: number;
    size?: number;
    value?: string;
  }

  class QRious {
    constructor(options?: QRiousOptions);
    set(options: QRiousOptions): void;
    toDataURL(type?: string): string;
  }

  export default QRious;
}

