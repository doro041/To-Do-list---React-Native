import {useState} from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ScrollView
} from 'react-native';
import Task from './components/Task';
import * as RN from 'react-native';
import * as React from 'react';

class ADHDCalendar extends React.Component {
    months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"];

    weekDays = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    state = {
        activeDate: new Date()
    };

    generateMatrix() {
        var matrix = [];
        // Create header
        matrix[0] = this.weekDays;

        // More code here
        var year = this.state.activeDate.getFullYear();
        var month = this.state.activeDate.getMonth();

        var firstDay = new Date(year, month, 1).getDay();
        var maxDays = this.nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }

        return matrix;

    }

    render() {
        var matrix = this.generateMatrix();
        return (
            <RN.View>
                <RN.Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center'
                }}>
                    {this.months[this.state.activeDate.getMonth()]} &nbsp;
                    {this.state.activeDate.getFullYear()}
                </RN.Text>
            </RN.View>
        );
    }
}

export default class App extends React.Component {
    render() {
        const [task, setTask] = useState();
        const [taskItems, setTaskItems] = useState([]);

        const handleAddTask = () => {
            Keyboard.dismiss();
            setTaskItems([...taskItems, task]);
            setTask(null);
        };

        const completeTask = (index) => {
            let itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy);
        };


        return (
            <ADHDCalendar/>

            // <View style={styles.container}>
            //   {/* Added this scroll view to enable scrolling when list gets longer than the page */}
            //   <ScrollView
            //     contentContainerStyle={{
            //       flexGrow: 1
            //     }}
            //     keyboardShouldPersistTaps='handled'
            //   >
            //
            //   {/* Today's Tasks */}
            //   <View style={styles.tasksWrapper}>
            //     <Text style={styles.sectionTitle}>Today's tasks</Text>
            //     <View style={styles.items}>
            //       {/* This is where the tasks will go! */}
            //       {
            //         taskItems.map((item, index) => {
            //           return (
            //             <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
            //               <Task text={item} />
            //             </TouchableOpacity>
            //           )
            //         })
            //       }
            //     </View>
            //   </View>
            //
            //   </ScrollView>
            //
            //   {/* Write a task */}
            //   {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
            //   <KeyboardAvoidingView
            //     behavior={Platform.OS === "ios" ? "padding" : "height"}
            //     style={styles.writeTaskWrapper}
            //   >
            //     <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
            //     <TouchableOpacity onPress={() => handleAddTask()}>
            //       <View style={styles.addWrapper}>
            //         <Text style={styles.addText}>+</Text>
            //       </View>
            //     </TouchableOpacity>
            //   </KeyboardAvoidingView>
            //
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {},
});
