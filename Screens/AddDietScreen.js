import { StyleSheet, Text, View, TextInput, Alert, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useContext } from 'react'
import { EntriesContext } from '../Components/EntriesContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, fontSize, borderRadius, borderWidth } from '../styles/styles';
import { useTheme } from '../Components/ThemeContext';

export default function AddDietScreen({ navigation }) {
  const { addNewEntry } = useContext(EntriesContext);
  const [dietDescription, setDietDescription] = useState('');
  const [dietCalories, setDietCalories] = useState('');
  const [dietDate, setDietDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();

  const validateInputs = () => {
    if (!dietDescription || !dietDate || !dietCalories || isNaN(dietCalories) || Number(dietCalories) < 0) {
      Alert.alert('Invalid input', 'Please check your input values');
      return false;
    }
    return true;
  };

  function handleAddDiet() {
    if (validateInputs()) {
      const newEntry = {
        type: 'diet',
        id: Date.now(),
        name: dietDescription,
        details: dietCalories,
        date: dietDate.toDateString(),
        isSpecial: dietCalories > 800,
      };

      addNewEntry('diet', newEntry);
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.label, { color: theme.textColor }]}>Description *</Text>
        <TextInput
          style={styles.descriptionInput}
          value={dietDescription}
          onChangeText={(text) => setDietDescription(text)}
          multiline={true}
          textAlignVertical='top'
        />

        <Text style={[styles.label, { color: theme.textColor }]}>Calories *</Text>
        <TextInput
          style={styles.input}
          value={dietCalories}
          onChangeText={(text) => setDietCalories(text)}
          keyboardType='numeric'
        />

        <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
        <TextInput
          style={styles.input}
          value={dietDate ? dietDate.toDateString() : ''}
          onPressIn={() => {
            setShowDatePicker(true);
            if (!dietDate) { 
              setDietDate(new Date()); 
            }
          }}
        />
        {showDatePicker && (
          <DateTimePicker
            value={dietDate || new Date()}
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDietDate(selectedDate);
            }}
          />
        )}

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.button}>
            <Button title="Save" onPress={handleAddDiet} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
  },
  label: {
    fontSize: fontSize.subtitle,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  input: {
    height: 40,
    borderWidth: borderWidth.medium,
    borderColor: colors.primary,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.large,
    color: colors.primary,
    backgroundColor: colors.background.secondary,
  },
  descriptionInput: {
    height: 80,
    borderWidth: borderWidth.medium,
    borderColor: colors.primary,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.large,
    color: colors.primary,
    backgroundColor: colors.background.secondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.large,
  },
  button: {
    width: '40%',
  },
});