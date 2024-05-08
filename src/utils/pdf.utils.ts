import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  NotoSansKR: {
    normal: 'assets/fonts/NotoSansKR-Regular.ttf',
    bold: 'assets/fonts/NotoSansKR-Bold.ttf',
    italics: 'assets/fonts/NotoSansKR-Light.ttf',
    bolditalics: 'assets/fonts/NotoSansKR-Medium.ttf',
  },
};
