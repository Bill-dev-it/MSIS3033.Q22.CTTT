// Applications — logically connected: skill/major-aligned students are more likely Approved
// Status distribution target: ~25 Approved, ~25 Pending, ~15 Rejected (out of ~65)
export const mockApplications = [
  // s1 Nguyen Van An (SE, React/Node) — 3 applications
  { id: 'a1', studentId: 's1', internshipId: 'i1', coverLetter: 'I am passionate about frontend development and have built several React applications including a student portal and an e-commerce dashboard. I am eager to learn from FPT\'s senior engineers and contribute to real client projects.', cvName: 'NguyenVanAn_CV.pdf', status: 'Approved', dateApplied: '2026-04-25', matchedDate: '2026-05-08' },
  { id: 'a2', studentId: 's1', internshipId: 'i6', coverLetter: 'Full-stack development is where I see my career heading. I have experience with React frontend and Node.js backend, and I am excited about the opportunity to work on Tiki\'s e-commerce platform.', cvName: 'NguyenVanAn_CV.pdf', status: 'Pending', dateApplied: '2026-05-05' },
  { id: 'a3', studentId: 's1', internshipId: 'i26', coverLetter: 'I am interested in building web interfaces for Zalo\'s mini-apps. My React skills and understanding of real-time technologies make me a good fit.', cvName: 'NguyenVanAn_CV.pdf', status: 'Pending', dateApplied: '2026-05-10' },

  // s2 Tran Thi Bich (IS, SQL/Python/PowerBI) — 3 applications
  { id: 'a4', studentId: 's2', internshipId: 'i4', coverLetter: 'Data analysis is my core strength. I have worked extensively with SQL and Python, and created Power BI dashboards for academic projects. Analyzing VNG\'s user behavior data would be a dream opportunity.', cvName: 'TranThiBich_Resume.pdf', status: 'Approved', dateApplied: '2026-04-20', matchedDate: '2026-05-05' },
  { id: 'a5', studentId: 's2', internshipId: 'i14', coverLetter: 'I am excited about analyzing transaction patterns at MoMo. My experience with SQL and BI tools, combined with my interest in fintech, makes this a perfect fit.', cvName: 'TranThiBich_Resume.pdf', status: 'Pending', dateApplied: '2026-05-03' },
  { id: 'a6', studentId: 's2', internshipId: 'i9', coverLetter: 'Business analysis aligns well with my Information Systems background. I am proficient in requirements gathering and data-driven analysis.', cvName: 'TranThiBich_Resume.pdf', status: 'Rejected', dateApplied: '2026-04-18', reviewNote: 'Looking for candidates with stronger BA methodology experience.' },

  // s3 Le Hoang Cuong (CS, C++/Python/ML) — 3 applications
  { id: 'a7', studentId: 's3', internshipId: 'i5', coverLetter: 'AI research is my academic passion. I have published a paper on Vietnamese NLP during my junior year and completed multiple ML/DL courses. I am excited to work on cutting-edge NLP at VNG.', cvName: 'LeHoangCuong_CV.pdf', status: 'Approved', dateApplied: '2026-04-22', matchedDate: '2026-05-06' },
  { id: 'a8', studentId: 's3', internshipId: 'i25', coverLetter: 'Working on Vietnamese NLP models at Zalo would allow me to apply my research skills to real-world products used by millions.', cvName: 'LeHoangCuong_CV.pdf', status: 'Pending', dateApplied: '2026-05-08' },
  { id: 'a9', studentId: 's3', internshipId: 'i11', coverLetter: 'I am interested in high-performance backend systems. My strong DSA background and C++ experience make me a competitive candidate.', cvName: 'LeHoangCuong_CV.pdf', status: 'Rejected', dateApplied: '2026-04-19', reviewNote: 'Strong candidate but prioritized Go/Java experience.' },

  // s4 Pham Thi Dung (DS, Python/TF/Pandas) — 3 applications
  { id: 'a10', studentId: 's4', internshipId: 'i5', coverLetter: 'Machine learning research aligns perfectly with my Data Science background. I have hands-on experience with TensorFlow and have completed projects in NLP and recommendation systems.', cvName: 'PhamThiDung_CV.pdf', status: 'Approved', dateApplied: '2026-04-21', matchedDate: '2026-05-07' },
  { id: 'a11', studentId: 's4', internshipId: 'i28', coverLetter: 'Data analysis at Shopee excites me. I can leverage my Python and Pandas skills to analyze marketplace trends and buyer behavior.', cvName: 'PhamThiDung_CV.pdf', status: 'Pending', dateApplied: '2026-05-06' },
  { id: 'a12', studentId: 's4', internshipId: 'i20', coverLetter: 'Data engineering is the natural next step for my Data Science career. I have experience with Spark and cloud platforms.', cvName: 'PhamThiDung_CV.pdf', status: 'Pending', dateApplied: '2026-05-09' },

  // s5 Hoang Minh Duc (SE, Java/Spring) — 3 applications
  { id: 'a13', studentId: 's5', internshipId: 'i2', coverLetter: 'Backend development is my strongest area. I have built REST APIs with Java Spring Boot and have solid experience with MySQL. I am ready to contribute to FPT\'s microservices architecture.', cvName: 'HoangMinhDuc_CV.pdf', status: 'Approved', dateApplied: '2026-04-24', matchedDate: '2026-05-09' },
  { id: 'a14', studentId: 's5', internshipId: 'i21', coverLetter: 'I am interested in Axon Active\'s agile development culture. My Java background aligns well with the backend role requirements.', cvName: 'HoangMinhDuc_CV.pdf', status: 'Pending', dateApplied: '2026-05-07' },
  { id: 'a15', studentId: 's5', internshipId: 'i15', coverLetter: 'Working on smart city platforms at Viettel Digital is appealing. I can contribute with my Java Spring skills.', cvName: 'HoangMinhDuc_CV.pdf', status: 'Rejected', dateApplied: '2026-04-23', reviewNote: 'Prefers candidates based in Hanoi.' },

  // s6 Vo Thi Hue (InfoSec, Linux/Pen Testing) — 2 applications
  { id: 'a16', studentId: 's6', internshipId: 'i13', coverLetter: 'Cybersecurity at MoMo is exactly what I am trained for. I have hands-on experience with penetration testing tools and network analysis using Wireshark.', cvName: 'VoThiHue_CV.pdf', status: 'Approved', dateApplied: '2026-04-28', matchedDate: '2026-05-10' },
  { id: 'a17', studentId: 's6', internshipId: 'i24', coverLetter: 'Supporting VNPay\'s SOC team aligns with my interest in financial security. I am familiar with SIEM tools and incident response procedures.', cvName: 'VoThiHue_CV.pdf', status: 'Pending', dateApplied: '2026-05-06' },

  // s7 Dang Quoc Gia (IS, SAP/BA) — 3 applications
  { id: 'a18', studentId: 's7', internshipId: 'i9', coverLetter: 'Business analysis at Grab is my ideal internship. My IS background with SAP and UML knowledge provides a strong foundation for requirements gathering.', cvName: 'DangQuocGia_CV.pdf', status: 'Approved', dateApplied: '2026-04-26', matchedDate: '2026-05-08' },
  { id: 'a19', studentId: 's7', internshipId: 'i18', coverLetter: 'NashTech\'s international client projects interest me. My BA skills and English proficiency make me suitable for this role.', cvName: 'DangQuocGia_CV.pdf', status: 'Pending', dateApplied: '2026-05-04' },
  { id: 'a20', studentId: 's7', internshipId: 'i12', coverLetter: 'Product management at Shopee combines my analytical skills with my passion for e-commerce technology.', cvName: 'DangQuocGia_CV.pdf', status: 'Rejected', dateApplied: '2026-04-22', reviewNote: 'Looking for more product-focused experience.' },

  // s8 Bui Ngoc Ha (E-commerce, Figma/UX) — 3 applications
  { id: 'a21', studentId: 's8', internshipId: 'i7', coverLetter: 'UI/UX design at Tiki is perfect for me. I have been using Figma for 2+ years and have a portfolio of mobile app designs. My e-commerce background adds extra context.', cvName: 'BuiNgocHa_Portfolio.pdf', status: 'Approved', dateApplied: '2026-04-27', matchedDate: '2026-05-10' },
  { id: 'a22', studentId: 's8', internshipId: 'i22', coverLetter: 'I am excited about designing for European clients at Axon Active. My UX research skills and design system knowledge are well-suited.', cvName: 'BuiNgocHa_Portfolio.pdf', status: 'Pending', dateApplied: '2026-05-05' },
  { id: 'a23', studentId: 's8', internshipId: 'i12', coverLetter: 'My understanding of user experience and e-commerce gives me a unique perspective for product management.', cvName: 'BuiNgocHa_Portfolio.pdf', status: 'Rejected', dateApplied: '2026-04-20', reviewNote: 'Strong design background but limited PM experience.' },

  // s9 Nguyen Thanh Khoa (SE, React Native/Flutter) — 3 applications
  { id: 'a24', studentId: 's9', internshipId: 'i8', coverLetter: 'Mobile development at Grab is my dream internship. I have published a React Native app on the Play Store and have experience with Flutter and Firebase.', cvName: 'NguyenThanhKhoa_CV.pdf', status: 'Approved', dateApplied: '2026-04-23', matchedDate: '2026-05-07' },
  { id: 'a25', studentId: 's9', internshipId: 'i29', coverLetter: 'Building MoMo\'s mobile wallet features would be an incredible opportunity. I can bring my React Native and performance optimization experience.', cvName: 'NguyenThanhKhoa_CV.pdf', status: 'Pending', dateApplied: '2026-05-08' },
  { id: 'a26', studentId: 's9', internshipId: 'i23', coverLetter: 'Native mobile development at VNPay interests me. I want to expand my skills into native Android/iOS development.', cvName: 'NguyenThanhKhoa_CV.pdf', status: 'Pending', dateApplied: '2026-05-11' },

  // s10 Ly Thi Mai (CS, Python/Java/AWS) — 2 applications
  { id: 'a27', studentId: 's10', internshipId: 'i11', coverLetter: 'High-performance backend development at Shopee is exciting. My Java skills and AWS experience prepare me well for distributed systems work.', cvName: 'LyThiMai_CV.pdf', status: 'Approved', dateApplied: '2026-04-25', matchedDate: '2026-05-09' },
  { id: 'a28', studentId: 's10', internshipId: 'i6', coverLetter: 'Full-stack development at Tiki combines my backend strength with frontend learning. I am eager to grow as a full-stack engineer.', cvName: 'LyThiMai_CV.pdf', status: 'Pending', dateApplied: '2026-05-04' },

  // s11 Truong Van Nam (SE, Angular/.NET) — 2 applications
  { id: 'a29', studentId: 's11', internshipId: 'i17', coverLetter: 'Frontend development at NashTech matches my Angular and TypeScript skills. I am excited about working in an international environment.', cvName: 'TruongVanNam_CV.pdf', status: 'Approved', dateApplied: '2026-04-28', matchedDate: '2026-05-11' },
  { id: 'a30', studentId: 's11', internshipId: 'i15', coverLetter: 'I can contribute to Viettel Digital with my Angular and .NET skills for smart city platform development.', cvName: 'TruongVanNam_CV.pdf', status: 'Rejected', dateApplied: '2026-04-20', reviewNote: 'Candidate is based in HCMC; position requires Hanoi presence.' },

  // s12 Phan Thi Oanh (DS, R/Spark/DL) — 3 applications
  { id: 'a31', studentId: 's12', internshipId: 'i25', coverLetter: 'AI/ML at Zalo is exactly where I want to apply my deep learning expertise. I have research experience in NLP and published work in computer vision.', cvName: 'PhanThiOanh_CV.pdf', status: 'Approved', dateApplied: '2026-04-24', matchedDate: '2026-05-08' },
  { id: 'a32', studentId: 's12', internshipId: 'i20', coverLetter: 'Data engineering at KMS combines my data science skills with practical pipeline building. I have experience with Spark and Python.', cvName: 'PhanThiOanh_CV.pdf', status: 'Approved', dateApplied: '2026-04-22', matchedDate: '2026-05-06' },
  { id: 'a33', studentId: 's12', internshipId: 'i4', coverLetter: 'Data analysis at VNG would leverage my statistical analysis and visualization skills built during my Data Science program.', cvName: 'PhanThiOanh_CV.pdf', status: 'Rejected', dateApplied: '2026-04-18', reviewNote: 'Position already filled; strong candidate for future openings.' },

  // s13 Do Thanh Phong (InfoSec, Network Security) — 2 applications
  { id: 'a34', studentId: 's13', internshipId: 'i24', coverLetter: 'Cybersecurity at VNPay aligns with my specialization in network security and SOC operations. I have experience with Splunk and incident response.', cvName: 'DoThanhPhong_CV.pdf', status: 'Approved', dateApplied: '2026-04-29', matchedDate: '2026-05-12' },
  { id: 'a35', studentId: 's13', internshipId: 'i13', coverLetter: 'MoMo\'s security challenges in fintech fascinate me. I bring ethical hacking and vulnerability assessment skills.', cvName: 'DoThanhPhong_CV.pdf', status: 'Pending', dateApplied: '2026-05-07' },

  // s14 Cao Thi Quyen (BIS, ERP/SQL) — 2 applications
  { id: 'a36', studentId: 's14', internshipId: 'i18', coverLetter: 'Business analysis at NashTech is ideal for my BIS background. I am experienced in process mapping, SQL, and Agile methodologies.', cvName: 'CaoThiQuyen_CV.pdf', status: 'Approved', dateApplied: '2026-04-26', matchedDate: '2026-05-10' },
  { id: 'a37', studentId: 's14', internshipId: 'i30', coverLetter: 'Product management at VNG interests me. My project management and analytical skills can contribute to product development.', cvName: 'CaoThiQuyen_CV.pdf', status: 'Pending', dateApplied: '2026-05-05' },

  // s15 Vu Minh Quan (SE, Golang/K8s/DevOps) — 3 applications
  { id: 'a38', studentId: 's15', internshipId: 'i10', coverLetter: 'DevOps at Grab is my top choice. I have hands-on experience with Docker, Kubernetes, and CI/CD pipelines from personal projects and hackathons.', cvName: 'VuMinhQuan_CV.pdf', status: 'Approved', dateApplied: '2026-04-27', matchedDate: '2026-05-09' },
  { id: 'a39', studentId: 's15', internshipId: 'i27', coverLetter: 'FPT\'s DevOps team is where I can apply my Terraform and containerization skills at enterprise scale.', cvName: 'VuMinhQuan_CV.pdf', status: 'Pending', dateApplied: '2026-05-09' },
  { id: 'a40', studentId: 's15', internshipId: 'i11', coverLetter: 'My Golang experience makes me a strong fit for Shopee\'s backend infrastructure work.', cvName: 'VuMinhQuan_CV.pdf', status: 'Rejected', dateApplied: '2026-04-21', reviewNote: 'Strong DevOps profile but less backend focus than needed.' },

  // s16 Ngo Hoang Son (E-commerce, Marketing) — 2 applications
  { id: 'a41', studentId: 's16', internshipId: 'i12', coverLetter: 'Product management at Shopee combines my e-commerce knowledge with analytical skills. I understand online marketplace dynamics from my coursework.', cvName: 'NgoHoangSon_CV.pdf', status: 'Pending', dateApplied: '2026-05-04' },
  { id: 'a42', studentId: 's16', internshipId: 'i30', coverLetter: 'My e-commerce background and digital marketing skills can contribute valuable insights to VNG\'s product team.', cvName: 'NgoHoangSon_CV.pdf', status: 'Rejected', dateApplied: '2026-04-25', reviewNote: 'Looking for candidates with stronger technical product skills.' },

  // s17 Huynh Thi Thao (CS, Python/NLP/CV) — 2 applications
  { id: 'a43', studentId: 's17', internshipId: 'i25', coverLetter: 'Vietnamese NLP at Zalo is my dream opportunity. I have experience with PyTorch, NLP pipelines, and computer vision using OpenCV.', cvName: 'HuynhThiThao_CV.pdf', status: 'Approved', dateApplied: '2026-04-26', matchedDate: '2026-05-10' },
  { id: 'a44', studentId: 's17', internshipId: 'i5', coverLetter: 'AI research at VNG would push my NLP skills further. I have completed courses in deep learning and natural language processing.', cvName: 'HuynhThiThao_CV.pdf', status: 'Pending', dateApplied: '2026-05-08' },

  // s18 Le Van Tuan (SE, Vue/Laravel) — 2 applications
  { id: 'a45', studentId: 's18', internshipId: 'i6', coverLetter: 'Full-stack at Tiki excites me. My Vue.js and Laravel experience translates well to Tiki\'s tech stack, and I am quick to learn new frameworks.', cvName: 'LeVanTuan_CV.pdf', status: 'Approved', dateApplied: '2026-04-29', matchedDate: '2026-05-11' },
  { id: 'a46', studentId: 's18', internshipId: 'i17', coverLetter: 'Frontend development at NashTech interests me. I can adapt my Vue.js skills to React or Angular quickly.', cvName: 'LeVanTuan_CV.pdf', status: 'Pending', dateApplied: '2026-05-07' },

  // s19 Tran Duc Uyen (IS, BA/Scrum) — 2 applications
  { id: 'a47', studentId: 's19', internshipId: 'i9', coverLetter: 'Business analysis at Grab is well-suited to my IS background and Scrum experience. I have used Jira and Confluence extensively in team projects.', cvName: 'TranDucUyen_CV.pdf', status: 'Approved', dateApplied: '2026-04-24', matchedDate: '2026-05-08' },
  { id: 'a48', studentId: 's19', internshipId: 'i12', coverLetter: 'Product management at Shopee aligns with my career goals. My analytical skills and agile methodology knowledge are strong assets.', cvName: 'TranDucUyen_CV.pdf', status: 'Pending', dateApplied: '2026-05-06' },

  // s20 Nguyen Thi Van (DS, Python/SQL/Scikit) — 2 applications
  { id: 'a49', studentId: 's20', internshipId: 'i14', coverLetter: 'Data analysis at MoMo is a perfect match for my skills. I have built multiple analytical dashboards and have strong SQL and Python proficiency.', cvName: 'NguyenThiVan_CV.pdf', status: 'Approved', dateApplied: '2026-04-28', matchedDate: '2026-05-11' },
  { id: 'a50', studentId: 's20', internshipId: 'i28', coverLetter: 'Analyzing Shopee\'s marketplace data would let me apply my data science skills to real business problems at scale.', cvName: 'NguyenThiVan_CV.pdf', status: 'Pending', dateApplied: '2026-05-09' },

  // s21 Dinh Quang Vinh (SE, React/Next.js) — 2 applications
  { id: 'a51', studentId: 's21', internshipId: 'i26', coverLetter: 'Frontend at Zalo fits my React and Next.js skills perfectly. I am passionate about building interactive web interfaces for social platforms.', cvName: 'DinhQuangVinh_CV.pdf', status: 'Approved', dateApplied: '2026-04-30', matchedDate: '2026-05-12' },
  { id: 'a52', studentId: 's21', internshipId: 'i1', coverLetter: 'Frontend development at FPT Software would strengthen my React skills through enterprise-level projects.', cvName: 'DinhQuangVinh_CV.pdf', status: 'Pending', dateApplied: '2026-05-10' },

  // s22 Mai Thi Xuan (E-commerce, UI/UX) — 2 applications
  { id: 'a53', studentId: 's22', internshipId: 'i22', coverLetter: 'UI/UX design at Axon Active excites me. I have a strong portfolio of user research and wireframing work for e-commerce projects.', cvName: 'MaiThiXuan_Portfolio.pdf', status: 'Approved', dateApplied: '2026-04-25', matchedDate: '2026-05-08' },
  { id: 'a54', studentId: 's22', internshipId: 'i7', coverLetter: 'Designing for Tiki\'s platform would combine my UX skills with my e-commerce domain knowledge.', cvName: 'MaiThiXuan_Portfolio.pdf', status: 'Rejected', dateApplied: '2026-04-19', reviewNote: 'Position filled; recommend for future design openings.' },

  // s23 Luu Minh Yen (InfoSec, SOC/OSINT) — 2 applications
  { id: 'a55', studentId: 's23', internshipId: 'i13', coverLetter: 'Cybersecurity at MoMo matches my SOC and incident response training. I have hands-on experience with Splunk and OSINT tools.', cvName: 'LuuMinhYen_CV.pdf', status: 'Pending', dateApplied: '2026-05-07' },
  { id: 'a56', studentId: 's23', internshipId: 'i24', coverLetter: 'VNPay\'s payment security challenges interest me. My knowledge of compliance standards and threat analysis is directly applicable.', cvName: 'LuuMinhYen_CV.pdf', status: 'Rejected', dateApplied: '2026-04-22', reviewNote: 'Position filled by earlier applicant.' },

  // s24 Pham Van Dat (SE, React/Node/MongoDB) — 3 applications
  { id: 'a57', studentId: 's24', internshipId: 'i6', coverLetter: 'Full-stack development at Tiki aligns with my MERN stack experience. I have built multiple projects with React, Node.js, and MongoDB.', cvName: 'PhamVanDat_CV.pdf', status: 'Pending', dateApplied: '2026-05-06' },
  { id: 'a58', studentId: 's24', internshipId: 'i2', coverLetter: 'Backend at FPT is a great opportunity for me. My Node.js and Docker skills are directly relevant.', cvName: 'PhamVanDat_CV.pdf', status: 'Approved', dateApplied: '2026-04-27', matchedDate: '2026-05-10' },
  { id: 'a59', studentId: 's24', internshipId: 'i26', coverLetter: 'I want to build web features for Zalo. My React experience and interest in messaging platforms drive my application.', cvName: 'PhamVanDat_CV.pdf', status: 'Rejected', dateApplied: '2026-04-20', reviewNote: 'Position requires stronger TypeScript experience.' },

  // s25 Tran Bao Ngoc (BIS, SAP/Agile) — 2 applications
  { id: 'a60', studentId: 's25', internshipId: 'i18', coverLetter: 'Business analysis at NashTech is ideal. My SAP experience, process mapping skills, and Agile certification make me well-prepared.', cvName: 'TranBaoNgoc_CV.pdf', status: 'Pending', dateApplied: '2026-05-05' },
  { id: 'a61', studentId: 's25', internshipId: 'i9', coverLetter: 'Grab\'s BA role would let me apply my Odoo and process mapping experience to tech product development.', cvName: 'TranBaoNgoc_CV.pdf', status: 'Pending', dateApplied: '2026-05-10' },

  // Additional applications from earlier students to fill gaps
  { id: 'a62', studentId: 's3', internshipId: 'i27', coverLetter: 'DevOps at FPT complements my Docker knowledge. I want to expand into infrastructure and CI/CD.', cvName: 'LeHoangCuong_CV.pdf', status: 'Pending', dateApplied: '2026-05-11' },
  { id: 'a63', studentId: 's10', internshipId: 'i15', coverLetter: 'Full-stack development at Viettel Digital\'s smart city projects excites me. My Java and AWS experience are strong assets.', cvName: 'LyThiMai_CV.pdf', status: 'Approved', dateApplied: '2026-04-30', matchedDate: '2026-05-12' },
  { id: 'a64', studentId: 's15', internshipId: 'i3', coverLetter: 'QA testing with automation is an area I want to explore alongside my DevOps skills. I have scripting experience that transfers well.', cvName: 'VuMinhQuan_CV.pdf', status: 'Pending', dateApplied: '2026-05-08' },
  { id: 'a65', studentId: 's11', internshipId: 'i21', coverLetter: 'Backend development at Axon Active interests me. My .NET Core experience is directly applicable to their technology stack.', cvName: 'TruongVanNam_CV.pdf', status: 'Approved', dateApplied: '2026-04-29', matchedDate: '2026-05-12' },
];
