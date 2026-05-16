import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Компонент одного поля форми
function FormField({ label, value, onChangeText, placeholder, secureTextEntry = false, keyboardType = 'default' }) {
  return (
    <View style={s.fieldWrap}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        style={s.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || ''}
        placeholderTextColor="#BDBDBD"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

export default function ProfileScreen() {
  const [form, setForm] = useState({
    email:           '',
    password:        '',
    passwordConfirm: '',
    lastName:        '',
    firstName:       '',
  });

  const set = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }));

  function handleRegister() {
    const { email, password, passwordConfirm, lastName, firstName } = form;

    if (!email || !password || !passwordConfirm || !lastName || !firstName) {
      Alert.alert('Помилка', 'Будь ласка, заповніть усі поля.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Помилка', 'Введіть коректну електронну пошту.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має містити щонайменше 6 символів.');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('Помилка', 'Паролі не співпадають.');
      return;
    }

    Alert.alert(
      'Успішно! ✅',
      `Вітаємо, ${firstName} ${lastName}!\nРеєстрацію завершено.`,
      [{ text: 'OK' }],
    );
  }

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* Заголовок */}
        <Text style={s.title}>Реєстрація</Text>

        {/* Поля форми — точно як у макеті */}
        <FormField
          label="Електронна пошта"
          value={form.email}
          onChangeText={set('email')}
          keyboardType="email-address"
        />
        <FormField
          label="Пароль"
          value={form.password}
          onChangeText={set('password')}
          secureTextEntry
        />
        <FormField
          label="Пароль (ще раз)"
          value={form.passwordConfirm}
          onChangeText={set('passwordConfirm')}
          secureTextEntry
        />
        <FormField
          label="Прізвище"
          value={form.lastName}
          onChangeText={set('lastName')}
        />
        <FormField
          label="Ім'я"
          value={form.firstName}
          onChangeText={set('firstName')}
        />

        {/* Кнопка реєстрації */}
        <TouchableOpacity style={s.btn} onPress={handleRegister} activeOpacity={0.85}>
          <Text style={s.btnTxt}>Зареєструватися</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Футер */}
      <View style={s.footer}>
        <Text style={s.footerTxt}>Шпонарський Володимир Петрович, група ІПЗ-24-1</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  // Заголовок
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginVertical: 24,
  },

  // Поле форми
  fieldWrap: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 6,
    fontWeight: '400',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#212121',
    backgroundColor: '#fff',
  },

  // Кнопка — синя, як у макеті
  btn: {
    height: 48,
    backgroundColor: '#1B72E8',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Футер
  footer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  footerTxt: {
    fontSize: 12,
    color: '#9E9E9E',
    fontStyle: 'italic',
  },
});
