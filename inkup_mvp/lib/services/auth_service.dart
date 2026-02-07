import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

import '../core/constants.dart';
import '../models/user_model.dart';

class AuthService {
  AuthService({
    FirebaseAuth? auth,
    FirebaseFirestore? firestore,
    GoogleSignIn? googleSignIn,
  }) : _auth = auth ?? FirebaseAuth.instance,
       _firestore = firestore ?? FirebaseFirestore.instance,
       _googleSignIn = googleSignIn ?? GoogleSignIn();

  final FirebaseAuth _auth;
  final FirebaseFirestore _firestore;
  final GoogleSignIn _googleSignIn;

  Stream<User?> get authStateChanges => _auth.authStateChanges();

  User? get currentUser => _auth.currentUser;

  Stream<UserModel?>? _userSnapshot;

  /// Écoute le document Firestore de l'utilisateur connecté (role, inkPoints, premium).
  Stream<UserModel?> get userStream {
    final uid = _auth.currentUser?.uid;
    if (uid == null) return Stream.value(null);
    _userSnapshot ??= _firestore
        .collection(AppConstants.colUsers)
        .doc(uid)
        .snapshots()
        .map(
          (snap) =>
              snap.exists ? UserModel.fromMap(snap.id, snap.data()!) : null,
        );
    return _userSnapshot!;
  }

  void _resetUserStream() {
    _userSnapshot = null;
  }

  Future<UserModel?> getUserOnce() async {
    final uid = _auth.currentUser?.uid;
    if (uid == null) return null;
    final doc = await _firestore
        .collection(AppConstants.colUsers)
        .doc(uid)
        .get();
    return doc.exists ? UserModel.fromMap(doc.id, doc.data()!) : null;
  }

  /// Inscription avec email / mot de passe. Crée le document user avec role reader.
  Future<UserCredential> signUpWithEmail(String email, String password) async {
    final cred = await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
    await _ensureUserDocument(cred.user!, email: email);
    return cred;
  }

  Future<void> signInWithEmail(String email, String password) async {
    await _auth.signInWithEmailAndPassword(email: email, password: password);
    _resetUserStream();
  }

  Future<void> signInWithGoogle() async {
    final googleUser = await _googleSignIn.signIn();
    if (googleUser == null) return;
    final googleAuth = await googleUser.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    final cred = await _auth.signInWithCredential(credential);
    await _ensureUserDocument(
      cred.user!,
      displayName: cred.user!.displayName,
      photoUrl: cred.user!.photoURL,
      email: cred.user!.email,
    );
    _resetUserStream();
  }

  Future<void> _ensureUserDocument(
    User user, {
    String? email,
    String? displayName,
    String? photoUrl,
  }) async {
    final ref = _firestore.collection(AppConstants.colUsers).doc(user.uid);
    await ref.set({
      'email': email ?? user.email,
      'displayName': displayName ?? user.displayName,
      'photoUrl': photoUrl ?? user.photoURL,
      'role': AppConstants.roleReader,
      'isPremiumAuthor': false,
      'inkPointsBalance': 0,
    }, SetOptions(merge: true));
  }

  Future<void> signOut() async {
    await _googleSignIn.signOut();
    await _auth.signOut();
    _resetUserStream();
  }

  /// Passe le rôle à author (écran "Devenir auteur").
  Future<void> becomeAuthor() async {
    final uid = _auth.currentUser?.uid;
    if (uid == null) return;
    await _firestore.collection(AppConstants.colUsers).doc(uid).update({
      'role': AppConstants.roleAuthor,
    });
    _resetUserStream();
  }
}
