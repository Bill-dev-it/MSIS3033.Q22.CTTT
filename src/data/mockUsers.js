const avatar = (name, bg) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff`;

// Demo accounts: student_a/123, fpt_hr/123, lecturer/123, admin/123
// Additional student/company accounts for completeness but not emphasized in demo
export const mockUsers = [
  // Primary demo accounts
  { id: 'u1', username: 'student_a', password: '123', role: 'Student', refId: 's1', name: 'Nguyen Van An', avatar: avatar('Nguyen Van An', '0D8ABC') },
  { id: 'u4', username: 'fpt_hr', password: '123', role: 'Company', refId: 'c1', name: 'Nguyen Thi Mai – FPT Software', avatar: avatar('FPT HR', '0D8ABC') },
  { id: 'u9', username: 'lecturer', password: '123', role: 'Lecturer', refId: null, name: 'TS. Lê Thanh Minh', avatar: avatar('Le Thanh Minh', '8B5CF6') },
  { id: 'u10', username: 'admin', password: '123', role: 'Admin', refId: null, name: 'System Admin', avatar: avatar('Admin', 'EF4444') },

  // Other student accounts
  { id: 'u2', username: 'student_b', password: '123', role: 'Student', refId: 's2', name: 'Tran Thi Bich', avatar: avatar('Tran Thi Bich', 'F59E0B') },
  { id: 'u3', username: 'student_c', password: '123', role: 'Student', refId: 's3', name: 'Le Hoang Cuong', avatar: avatar('Le Hoang Cuong', '10B981') },
  { id: 'u11', username: 'student_d', password: '123', role: 'Student', refId: 's4', name: 'Pham Thi Dung', avatar: avatar('Pham Thi Dung', '8B5CF6') },
  { id: 'u12', username: 'student_e', password: '123', role: 'Student', refId: 's5', name: 'Hoang Minh Duc', avatar: avatar('Hoang Minh Duc', 'EC4899') },
  { id: 'u13', username: 'student_f', password: '123', role: 'Student', refId: 's6', name: 'Vo Thi Hue', avatar: avatar('Vo Thi Hue', '14B8A6') },
  { id: 'u14', username: 'student_g', password: '123', role: 'Student', refId: 's7', name: 'Dang Quoc Gia', avatar: avatar('Dang Quoc Gia', 'F97316') },
  { id: 'u15', username: 'student_h', password: '123', role: 'Student', refId: 's8', name: 'Bui Ngoc Ha', avatar: avatar('Bui Ngoc Ha', '6366F1') },
  { id: 'u16', username: 'student_i', password: '123', role: 'Student', refId: 's9', name: 'Nguyen Thanh Khoa', avatar: avatar('Nguyen Thanh Khoa', 'EF4444') },
  { id: 'u17', username: 'student_j', password: '123', role: 'Student', refId: 's10', name: 'Ly Thi Mai', avatar: avatar('Ly Thi Mai', '3B82F6') },
  { id: 'u18', username: 'student_k', password: '123', role: 'Student', refId: 's11', name: 'Truong Van Nam', avatar: avatar('Truong Van Nam', 'D946EF') },
  { id: 'u19', username: 'student_l', password: '123', role: 'Student', refId: 's12', name: 'Phan Thi Oanh', avatar: avatar('Phan Thi Oanh', '059669') },
  { id: 'u20', username: 'student_m', password: '123', role: 'Student', refId: 's13', name: 'Do Thanh Phong', avatar: avatar('Do Thanh Phong', 'DC2626') },
  { id: 'u21', username: 'student_n', password: '123', role: 'Student', refId: 's14', name: 'Cao Thi Quyen', avatar: avatar('Cao Thi Quyen', '7C3AED') },
  { id: 'u22', username: 'student_o', password: '123', role: 'Student', refId: 's15', name: 'Vu Minh Quan', avatar: avatar('Vu Minh Quan', '2563EB') },
  { id: 'u23', username: 'student_p', password: '123', role: 'Student', refId: 's16', name: 'Ngo Hoang Son', avatar: avatar('Ngo Hoang Son', 'C026D3') },
  { id: 'u24', username: 'student_q', password: '123', role: 'Student', refId: 's17', name: 'Huynh Thi Thao', avatar: avatar('Huynh Thi Thao', '0891B2') },
  { id: 'u25', username: 'student_r', password: '123', role: 'Student', refId: 's18', name: 'Le Van Tuan', avatar: avatar('Le Van Tuan', 'CA8A04') },
  { id: 'u26', username: 'student_s', password: '123', role: 'Student', refId: 's19', name: 'Tran Duc Uyen', avatar: avatar('Tran Duc Uyen', 'BE185D') },
  { id: 'u27', username: 'student_t', password: '123', role: 'Student', refId: 's20', name: 'Nguyen Thi Van', avatar: avatar('Nguyen Thi Van', '4F46E5') },
  { id: 'u28', username: 'student_u', password: '123', role: 'Student', refId: 's21', name: 'Dinh Quang Vinh', avatar: avatar('Dinh Quang Vinh', '0D9488') },
  { id: 'u29', username: 'student_v', password: '123', role: 'Student', refId: 's22', name: 'Mai Thi Xuan', avatar: avatar('Mai Thi Xuan', 'EA580C') },
  { id: 'u30', username: 'student_w', password: '123', role: 'Student', refId: 's23', name: 'Luu Minh Yen', avatar: avatar('Luu Minh Yen', '9333EA') },
  { id: 'u31', username: 'student_x', password: '123', role: 'Student', refId: 's24', name: 'Pham Van Dat', avatar: avatar('Pham Van Dat', '2DD4BF') },
  { id: 'u32', username: 'student_y', password: '123', role: 'Student', refId: 's25', name: 'Tran Bao Ngoc', avatar: avatar('Tran Bao Ngoc', '0D8ABC') },

  // Company HR accounts
  { id: 'u5', username: 'vng_hr', password: '123', role: 'Company', refId: 'c2', name: 'Tran Hoang Phuc – VNG', avatar: avatar('VNG HR', '10B981') },
  { id: 'u6', username: 'tiki_hr', password: '123', role: 'Company', refId: 'c3', name: 'Le Thanh Hoa – Tiki', avatar: avatar('Tiki HR', '3B82F6') },
  { id: 'u7', username: 'grab_hr', password: '123', role: 'Company', refId: 'c4', name: 'Pham Quoc Viet – Grab', avatar: avatar('Grab HR', '059669') },
  { id: 'u8', username: 'shopee_hr', password: '123', role: 'Company', refId: 'c5', name: 'Vo Minh Tuan – Shopee', avatar: avatar('Shopee HR', 'EA580C') },
  { id: 'u33', username: 'momo_hr', password: '123', role: 'Company', refId: 'c6', name: 'Nguyen Duc Anh – MoMo', avatar: avatar('MoMo HR', 'A50064') },
  { id: 'u34', username: 'viettel_hr', password: '123', role: 'Company', refId: 'c7', name: 'Hoang Van Thanh – Viettel', avatar: avatar('Viettel HR', 'E40613') },
  { id: 'u35', username: 'nashtech_hr', password: '123', role: 'Company', refId: 'c8', name: 'Dang Thi Lan – NashTech', avatar: avatar('NashTech HR', '1E3A5F') },
  { id: 'u36', username: 'kms_hr', password: '123', role: 'Company', refId: 'c9', name: 'Tran Minh Khoa – KMS', avatar: avatar('KMS HR', '0078D4') },
  { id: 'u37', username: 'axon_hr', password: '123', role: 'Company', refId: 'c10', name: 'Le Thi Ngoc – Axon Active', avatar: avatar('Axon HR', 'FF6B00') },
  { id: 'u38', username: 'vnpay_hr', password: '123', role: 'Company', refId: 'c11', name: 'Bui Duc Thang – VNPay', avatar: avatar('VNPay HR', '005BAA') },
  { id: 'u39', username: 'zalo_hr', password: '123', role: 'Company', refId: 'c12', name: 'Nguyen Thu Hang – Zalo', avatar: avatar('Zalo HR', '0068FF') },
];
