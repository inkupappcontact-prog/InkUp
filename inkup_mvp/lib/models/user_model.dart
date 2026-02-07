import '../core/constants.dart';

class UserModel {
  final String uid;
  final String? email;
  final String? displayName;
  final String? photoUrl;
  final String role;
  final bool isPremiumAuthor;
  final DateTime? premiumEndDate;
  final int inkPointsBalance;
  final String? stripeCustomerId;

  const UserModel({
    required this.uid,
    this.email,
    this.displayName,
    this.photoUrl,
    this.role = AppConstants.roleReader,
    this.isPremiumAuthor = false,
    this.premiumEndDate,
    this.inkPointsBalance = 0,
    this.stripeCustomerId,
  });

  bool get isAuthor => role == AppConstants.roleAuthor;

  factory UserModel.fromMap(String id, Map<String, dynamic> map) {
    return UserModel(
      uid: id,
      email: map['email'] as String?,
      displayName: map['displayName'] as String?,
      photoUrl: map['photoUrl'] as String?,
      role: map['role'] as String? ?? AppConstants.roleReader,
      isPremiumAuthor: map['isPremiumAuthor'] as bool? ?? false,
      premiumEndDate: map['premiumEndDate'] != null
          ? DateTime.tryParse(map['premiumEndDate'].toString())
          : null,
      inkPointsBalance: (map['inkPointsBalance'] as num?)?.toInt() ?? 0,
      stripeCustomerId: map['stripeCustomerId'] as String?,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'email': email,
      'displayName': displayName,
      'photoUrl': photoUrl,
      'role': role,
      'isPremiumAuthor': isPremiumAuthor,
      'premiumEndDate': premiumEndDate?.toIso8601String(),
      'inkPointsBalance': inkPointsBalance,
      'stripeCustomerId': stripeCustomerId,
    };
  }

  UserModel copyWith({
    String? uid,
    String? email,
    String? displayName,
    String? photoUrl,
    String? role,
    bool? isPremiumAuthor,
    DateTime? premiumEndDate,
    int? inkPointsBalance,
    String? stripeCustomerId,
  }) {
    return UserModel(
      uid: uid ?? this.uid,
      email: email ?? this.email,
      displayName: displayName ?? this.displayName,
      photoUrl: photoUrl ?? this.photoUrl,
      role: role ?? this.role,
      isPremiumAuthor: isPremiumAuthor ?? this.isPremiumAuthor,
      premiumEndDate: premiumEndDate ?? this.premiumEndDate,
      inkPointsBalance: inkPointsBalance ?? this.inkPointsBalance,
      stripeCustomerId: stripeCustomerId ?? this.stripeCustomerId,
    );
  }
}
