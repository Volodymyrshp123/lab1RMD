import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  Text,
} from 'react-native';

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 48) / 2;

const PHOTOS = [
  { id: '1', image: require('../assets/Mavpa.png') },
  { id: '2', image: require('../assets/Mavpa.png') },
  { id: '3', image: require('../assets/Mavpa.png') },
  { id: '4', image: require('../assets/Mavpa.png') },
  { id: '5', image: require('../assets/Mavpa.png') },
  { id: '6', image: require('../assets/Mavpa.png') },
  { id: '7', image: require('../assets/Mavpa.png') },
  { id: '8', image: require('../assets/Mavpa.png') },
  { id: '9', image: require('../assets/Mavpa.png') },
  { id: '10', image: require('../assets/Mavpa.png') },
  { id: '11', image: require('../assets/Mavpa.png') },
  { id: '12', image: require('../assets/Mavpa.png') },
];

function PhotoCard({ photo, onPress }) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={photo.image}
        style={s.photo}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

export default function GalleryScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={s.container}>
      <Text style={s.title}>Фотогалерея</Text>

      <FlatList
        data={PHOTOS}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={s.colWrapper}
        renderItem={({ item }) => (
          <PhotoCard photo={item} onPress={() => setSelected(item)} />
        )}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={s.footer} />

      <Modal
        visible={!!selected}
        animationType="slide"
        transparent
        onRequestClose={() => setSelected(null)}
      >
        <View style={s.overlay}>
          <View style={s.modal}>
            <Image
              source={selected?.image}
              style={s.modalImage}
              resizeMode="contain"
            />

            <TouchableOpacity style={s.modalCloseBtn} onPress={() => setSelected(null)}>
              <Text style={s.closeText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  listContent: {
    padding: 12,
    paddingBottom: 16,
  },
  colWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  card: {
    width: CELL_SIZE,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },

  photo: {
    width: '100%',
    height: CELL_SIZE * 0.85,
  },

  footer: {
    height: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    alignItems: 'center',
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 24,
  },
  modalCloseBtn: {
    width: '100%',
    height: 48,
    backgroundColor: '#1565C0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});