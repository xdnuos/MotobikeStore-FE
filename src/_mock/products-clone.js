import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
    'Viên uống trường thọ, trẻ hóa da NMN Premium 21600 thọ, trẻ hóa da NMN Premium 21600',
    'Nike Space Hippie 04',
    'Nike Air Zoom Pegasus 37 A.I.R.sss ssssss ssssssss sssssssss ssssss ssss sss sssss more cnah anhk aku akkna nnnnnn nan Chaz Bear',
    'Nike Blazer Low 77 sss ssss sssssss ssssss ssssss ssssss Vintage',
    'Nike ZoomX Supe ssss ssss ssss sss ssss sssss sssss ss rRep Surge',
    'Zoom Freaks s ssss ssss ss ssss ssss sssss 2',
    'Nike Air Max Zephyr',
    'Jordan Delta',
    'Air Jordan XXXV PF',
    'Nike Waffle Racer Crater',
    'Kyrie 7 EP Sisterhood',
    'Nike Air Zoom BB NXT',
    'Nike Air Force 1 07 LX',
    'Nike Air Force 1 Shadow SE',
    'Nike Air Zoom Tempo NEXT%',
    'Nike DBreak-Type',
    'Nike Air Max Up',
    'Nike Air Max 270 React ENG',
    'NikeCourt Royale',
    'Nike Air Zoom Pegasus 37 Premium',
    'Nike Air Zoom SuperRep',
    'NikeCourt Royale',
    'Nike React Art3mis',
    'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];
const PRODUCT_COVER = [
    // 'https://nhathuoclongchau.com.vn/images/product/2020/01/00017891-boi-mau-forte-tat-thanh-125ml-siro-bo-phe-4358-5e14_large.jpg',
    'https://res.cloudinary.com/drn7nawnc/image/upload/v1681835099/mmeajopn8sum7wud2cr5.webp',
    'https://res.cloudinary.com/drn7nawnc/image/upload/v1681835075/azjps83m6pkwellhnect.webp',
    'https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/00031150_bot_can_tay_nguyen_chat_datino_3gx15_goi_1483_62ad_large_f0aacc5800.jpg',
    'https://res.cloudinary.com/drn7nawnc/image/upload/v1681835075/azjps83m6pkwellhnect.webp',
    'https://nhathuoclongchau.com.vn/images/product/2022/06/00017326-sebiaclear-gel-moussant-200ml-svr-7018-62ae_large.JPG',
    'https://nhathuoclongchau.com.vn/images/product/2022/06/00022782-sua-rua-mat-nghe-nano-ngua-mun-neo-cleanser-86g-1735-62ae_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2023/02/00022006-sua-rua-mat-bun-bien-giam-mun-rosette-acne-clear-120g-5962-63db_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2021/03/00018875-cao-dan-yaguchi-75x10cm-5-mieng-1137-6064_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2018/09/00009897-hoat-huyet-duong-nao-bao-phim100v-9433-5bab_large.JPG',
    'https://nhathuoclongchau.com.vn/images/product/2018/09/00008451-long-huyet-ph-tan-bam-tim-chua-lanh-vet-thuong-8927-5ba8_large.JPG',
    'https://nhathuoclongchau.com.vn/images/product/2021/11/00017015-ong-hit-sao-vang-danapha-15g-6956-6189_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2022/06/00029865-allisa-pregnancy-test-kit-que-thu-thai-6689-62b5_large.JPG',
    'https://nhathuoclongchau.com.vn/images/product/2022/06/00028875-lh-tana-tanaphar-12-que-que-thu-rung-trung-7078-62b9_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2022/08/00501510-que-thu-thai-korea-hello-baby-dang-but-5843-62f4_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2022/06/00021682-mieng-dan-ha-sot-lion-hiepita-for-child-8-goi-x-2-mieng-6522-62ba_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2022/06/00030073-bang-keo-ca-nhan-vai-ace-band-f-72x18mm-2061-62b5_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2020/09/00021307-bang-keo-cuon-lua-young-plaster-silk-25cm-x-5m-6573-5f73_large.JPG',
    'https://nhathuoclongchau.com.vn/images/product/2022/06/00031339-gac-tam-con-quick-nurse-6x3cm-hop-100-mieng-1489-62b5_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2020/10/00021989-bang-keo-cuon-giay-young-plaster-paper-125cmx-5m-2543-5f76_large.JPG',
    'https://nhathuoclongchau.com.vn/images/product/2020/10/00020412-bamogin-thanh-cong-6x10-2084-5f92_large.JPG',
    'https://nhathuoclongchau.com.vn/images/product/2022/10/00031036-omexxel-ginkgo-120-2x15-5958-633e_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2022/08/00501705-vien-uong-bo-nao-pharma-world-brain-support-60v-6662-6302_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2023/02/00503276-vien-uong-ho-tro-tang-cuong-tuan-hoan-nao-natto-gold-3000fu-royal-care-60v-8247-63ed_large.jpg',
    'https://nhathuoclongchau.com.vn/images/product/2019/01/00014588-cevinton-forte-30v-9279-5c45_large.jpg',

];
// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
    const setIndex = index + 1;

    return {
        id: faker.datatype.uuid(),
        cover: PRODUCT_COVER[index],
        name: PRODUCT_NAME[index],
        // faker.datatype.number({ min: 4, max: 99, precision: 0.01 })
        price: '50000000',
        colors:
            (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
            (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
            (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
            (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
            (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
            (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
            PRODUCT_COLOR,
        unit: sample(['Tuýp','Viên', 'Hộp', 'Gói', 'Chai','Lọ']),
        status: sample(['1 Tuýp x 20 Viên', 'Hộp 30 viên', 'Hộp 20 gói', 'Chai']),
    };
});

export default products;