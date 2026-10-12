# Trọng — Personal Portfolio

Website Vue 3 + Vite + Vue Router, theo thiết kế Figma V3. Đây là **website trên trình duyệt**, không có Electron/Theia runtime. Các công nghệ đó chỉ xuất hiện trong nội dung kinh nghiệm.

## Chạy trên Windows / PowerShell

Cài Node.js 22 LTS (22.12 trở lên) hoặc Node.js 24, giải nén và mở terminal tại thư mục `trong-portfolio`:

```powershell
npm ci
npm run dev
```

Mở URL localhost Vite in trong terminal. Không mở `index.html` bằng double-click.

```powershell
npm run build
npm run preview
```

`dist/` là kết quả build. Chỉ cần `npm run dev` khi đang chỉnh code; Vite cập nhật trực tiếp. Sau khi thay đổi code dùng cho hosting, build lại rồi upload `dist` mới.

## Cấu trúc

- `src/views/`: Home, About, Projects, Research, Contact, chi tiết dự án và 404.
- `src/components/`: Header, Footer, giới thiệu trang, card dự án, hình minh họa, social links.
- `src/data/profile.js`: tên, email, GitHub, LinkedIn, CV, công ty.
- `src/data/projects.js`: nội dung dự án và case study.
- `src/data/research.js`: các chủ đề nghiên cứu.
- `src/router/index.js`: route, lazy loading, title, scroll behavior.
- `src/assets/styles.css`: màu, typography, responsive.
- `src/assets/reservoir-layers.svg`: vector gốc đã dùng để tạo thiết kế Figma.
- `public/_redirects`: SPA fallback cho Cloudflare Pages; mở trực tiếp hoặc refresh `/about` vẫn hoạt động.

## Thay thông tin của bạn

Mở `src/data/profile.js`. Điền URL chính xác của bạn:

```js
email: 'your-email@example.com',
github: 'https://github.com/your-username',
linkedin: 'https://www.linkedin.com/in/your-profile',
cvUrl: '/cv.pdf',
```

Đặt CV thật vào `public/cv.pdf`. Source không tạo CV giả và không đoán link cá nhân. Nếu để trống, nút tải CV sẽ ẩn; Contact hiển thị “Link coming soon”. Chỉ cần sửa tại đây, không phải sửa từng trang.

Nội dung tiếng Anh là bản nháp dựa trên các dự án đã trao đổi. Kiểm tra vai trò, tên công ty và mô tả trước khi công khai. Không tự thêm số năm kinh nghiệm, số liệu thành tích hoặc bằng cấp chưa xác nhận.

Hình dự án là concept minh họa từ thiết kế, không phải screenshot sản phẩm thực. Để thay, thêm ảnh vào `public/images/` rồi chỉnh `ProjectVisual.vue`, hoặc bổ sung thuộc tính image cho project data. Đảm bảo có quyền công khai ảnh dự án công ty.

## Cloudflare Pages

### Kết nối Git repository

1. Đưa thư mục source lên repository của bạn (không đưa `node_modules`).
2. Tạo Pages project trên Cloudflare, kết nối repository.
3. Build command: `npm run build`.
4. Build output directory: `dist`.
5. Root directory: để trống nếu package.json nằm ở gốc repo; nếu repo chứa folder `trong-portfolio`, nhập tên folder đó.
6. Đặt Node version 22 hoặc 24 nếu cần; project đã có `.node-version`.
7. Deploy và gắn custom domain từ dashboard khi bạn muốn.

### Upload bản build

Chạy `npm run build`, tạo Pages project với Direct Upload rồi upload thư mục `dist`. Mỗi lần sửa cần build và upload lại. Không upload thư mục source thay cho dist.

- https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://router.vuejs.org/guide/essentials/history-mode.html

Không cần backend, database hay đăng nhập. Contact mở mail client qua `mailto:` sau khi điền email; không gửi mail tự động và không có form giả. Research là topic accordion, chưa có bài nghiên cứu được xuất bản. Project detail là nội dung draft có thể sửa trong data.

## Thiết kế

Figma: https://www.figma.com/design/9KdDpGMk4km0xj4ULO7KbA?node-id=9-436

Home được đối chiếu design context. Figma Starter hết lượt đọc khi lấy các trang còn lại; các trang đó được triển khai theo nội dung và cấu trúc V3 đã tạo trước đó. Font Inter/Manrope được bundle local bằng Fontsource. Hình SVG dùng bản vector gốc của thiết kế vì endpoint export trả “Site Unavailable”.

Responsive: menu thu gọn, bố cục 1 cột trên mobile; reduced motion, keyboard focus, skip link. Các trang chi tiết dự án là phần triển khai bổ sung phù hợp với thiết kế chung.

Đây là SPA; metadata được cập nhật phía client. Nếu cần SEO/social preview riêng cho từng dự án, có thể bổ sung prerender hoặc chuyển sang Nuxt static generation sau.

## Kiểm tra bản bàn giao

- `npm run build`: thành công.
- Chromium: 10 route × 2 kích thước (1440px, 390px), không tràn ngang, không ảnh lỗi, không lỗi JavaScript.
- Kiểm tra menu mobile đóng khi chuyển trang, accordion Research, chuyển vào chi tiết dự án, refresh route trực tiếp qua Vite preview.
- Kiểm tra hình ảnh Home desktop/mobile với bản Figma.
- Chưa deploy lên tài khoản Cloudflare; cần điền thông tin cá nhân và kiểm tra nội dung trước khi publish.

File ZIP kèm `dist/` đã build, có thể dùng cho Cloudflare Pages Direct Upload. Khi sửa source, chạy lại `npm run build`.

## Cập nhật: Home đầy đủ nội dung

Home là trang dài, bao gồm giới thiệu, cả 3 dự án (cùng tóm tắt), About/kỹ năng, kinh nghiệm/học vấn, cách làm việc, 4 chủ đề research và liên hệ. Các trang About, Projects, Research, Contact vẫn giữ trên menu như những trang bổ sung.

Các section dùng chung nằm trong `src/components/`: `ExperienceSection.vue`, `ProjectsSection.vue`, `ResearchSection.vue`, `ContactSection.vue`, `AboutBand.vue`. Sửa nội dung section/data một lần sẽ cập nhật cả Home và trang riêng. Nút “Explore my work” trên Home cuộn đến phần Projects.

Kiểm tra bản cập nhật Home: build production thành công. Các kiểm tra browser ghi ở mục trước thuộc bản gốc; lần cập nhật này trình duyệt kiểm thử gặp lỗi môi trường khi khởi động nên chưa chạy lại được kiểm tra hình ảnh tự động.
