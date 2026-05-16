import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Modal, ScrollView,
} from 'react-native';

const NEWS = [
  { id: '1', emoji: '🏛️', title: 'Відкриття нового корпусу', date: '09 квітня 2026', preview: 'Університет урочисто відкрив оновлений корпус №4 після реконструкції.', full: 'Університет урочисто відкрив оновлений навчальний корпус №4 після масштабної реконструкції. Будівля обладнана сучасними лабораторіями, комп\'ютерними класами та конференц-залами. Захід відвідали представники місцевої влади та партнери університету.' },
  { id: '2', emoji: '🏆', title: 'Перемога на All-Ukrainian Hackathon', date: '07 квітня 2026', preview: 'Студенти ІТ-факультету зайняли 1 місце на всеукраїнському хакатоні.', full: 'Команда студентів факультету інформаційних технологій зайняла перше місце на All-Ukrainian Hackathon 2026 у Києві. Проєкт присвячений автоматизації моніторингу екологічного стану річок з IoT та машинним навчанням.' },
  { id: '3', emoji: '🤝', title: 'Угода про співпрацю з SoftServe', date: '05 квітня 2026', preview: 'Підписано меморандум із провідною IT-компанією України.', full: 'Житомирська Політехніка підписала меморандум із компанією SoftServe. Угода передбачає практику студентів, спільні науково-дослідні проєкти та сертифікаційні програми для викладачів.' },
  { id: '4', emoji: '🎓', title: 'Конференція "Інновації в освіті 2026"', date: '02 квітня 2026', preview: 'Міжнародна конференція за участі 200+ науковців з 4 країн.', full: 'На базі університету пройшла міжнародна науково-практична конференція. Взяли участь понад 200 науковців з України, Польщі, Литви та Естонії. Розглядались питання цифрової трансформації освіти.' },
  { id: '5', emoji: '🔐', title: 'Нова магістратура з кібербезпеки', date: '31 березня 2026', preview: 'Відкривається нова магістерська програма з кібербезпеки.', full: 'З наступного навчального року університет відкриває магістерську програму "Кібербезпека та захист інформації". Програму розроблено спільно з фахівцями СБУ та провідних IT-компаній регіону.' },
  { id: '6', emoji: '🏀', title: 'Чемпіонат з баскетболу', date: '28 березня 2026', preview: 'Збірна університету стала чемпіоном обласної студентської ліги.', full: 'Збірна університету стала чемпіоном обласної студентської ліги з баскетболу 2026 року. У фінальному матчі наша команда перемогла команду ЖДУ з рахунком 78:65.' },
  { id: '7', emoji: '🇪🇺', title: 'Грант ЄС на STEM-освіту', date: '25 березня 2026', preview: 'Університет отримав грантове фінансування від Erasmus+.', full: 'Університет отримав грантове фінансування від ЄС у рамках Erasmus+ для розвитку STEM-освіти. Кошти спрямовано на закупівлю обладнання для лабораторій робототехніки та 3D-друку.' },
  { id: '8', emoji: '📢', title: 'День відкритих дверей — 25 квітня', date: '20 березня 2026', preview: 'Запрошуємо абітурієнтів та їхніх батьків до університету.', full: 'Щорічний день відкритих дверей відбудеться 25 квітня 2026 року. Абітурієнти зможуть познайомитись з кафедрами, переглянути лабораторії та поспілкуватись зі студентами. Початок о 10:00, корпус №1.' },
];

function NewsCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.cardImg}>
        <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Text style={styles.cardPreview} numberOfLines={2}>{item.preview}</Text>
      </View>
      <Text style={{ fontSize: 18, color: '#BDBDBD', alignSelf: 'center' }}>›</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Новини</Text>

      <FlatList
        data={NEWS}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <NewsCard item={item} onPress={() => setSelected(item)} />
        )}
        contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Шпонарський Володимир Петрович, група ІПЗ-24-1</Text>
      </View>

      {/* Modal */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <ScrollView>
              <Text style={{ fontSize: 52, textAlign: 'center', marginBottom: 12 }}>{selected?.emoji}</Text>
              <Text style={styles.modalTitle}>{selected?.title}</Text>
              <Text style={styles.modalDate}>{selected?.date}</Text>
              <Text style={styles.modalBody}>{selected?.full}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
              <Text style={styles.closeTxt}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  pageTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, overflow: 'hidden', elevation: 2, padding: 4 },
  cardImg: { width: 72, height: 72, backgroundColor: '#E3F2FD', alignItems: 'center', justifyContent: 'center', borderRadius: 8, margin: 6 },
  cardBody: { flex: 1, paddingVertical: 8, paddingRight: 4 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#212121', marginBottom: 2 },
  cardDate: { fontSize: 11, color: '#1565C0', marginBottom: 3 },
  cardPreview: { fontSize: 12, color: '#757575', lineHeight: 16 },
  footer: { padding: 10, borderTopWidth: 1, borderTopColor: '#E0E0E0', backgroundColor: '#FAFAFA', alignItems: 'center' },
  footerText: { fontSize: 12, color: '#9E9E9E', fontStyle: 'italic' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '82%' },
  modalTitle: { fontSize: 19, fontWeight: '700', color: '#212121', textAlign: 'center', marginBottom: 6 },
  modalDate: { fontSize: 13, color: '#1565C0', textAlign: 'center', marginBottom: 14 },
  modalBody: { fontSize: 15, color: '#424242', lineHeight: 24, marginBottom: 20 },
  closeBtn: { backgroundColor: '#1565C0', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  closeTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
