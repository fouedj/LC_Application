export default function extractPhoneNumber(input: string): string | null {
    const telRegex = /^tel:(\d+)$/;
    const match = input.match(telRegex);
    if (match) {
      return match[1];
    }
    return null;
  }