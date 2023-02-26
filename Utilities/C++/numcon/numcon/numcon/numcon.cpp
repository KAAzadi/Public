// numcon.cpp : This file contains the 'main' function. Program execution begins and ends there.
//
#define BIN 2
#define DEC 10
#define HEX 16
#define OCT 8

#define FAILURE -1

#include <iostream>
#include <stack>

using namespace std;

//prototypes
int Chart(char value);
char Chart2(int value);
bool CheckInput(int argc, char* args[]);
void ConvertValue(char flag1, char flag2, char* value);
int GetFactor(char flag);
void PrintMenu();

//start
int main(int argc, char* args[])
{    
    ConvertValue(args[1][1], args[3][1], args[2]);
}

//provides a  simple digit conversion for all 16 potential values
int Chart(char value) 
{
    switch (value) {
    case '0':
        return 0;
        break;
    case  '1':
        return 1;
        break;
    case '2':
        return 2;
        break;
    case '3':
        return 3;
        break;
    case '4':
        return 4;
        break;
    case '5':
        return 5;
        break;
    case '6':
        return 6;
        break;
    case '7':
        return 7;
        break;
    case '8':
        return 8;
        break;
    case '9':
        return 9;
        break;
    case 'a':
    case 'A':
        return 10;
        break;
    case 'b':
    case 'B':
        return 11;
        break;
    case 'c':
    case 'C':
        return 12;
        break;
    case 'd':
    case 'D':
        return 13;
        break;
    case 'e':
    case 'E':
        return 14;
        break;
    case 'f':
    case 'F':
        return 15;
        break;
    default:
        cout << "Error: Unable to process value for " << value << ", please try again.\n";
        return FAILURE;
    }
}

char Chart2(int value)
{
    switch (value) {
    case  1:
        return '1';
    case 2:
        return '2';
    case 3:
        return '3';
    case 4:
        return '4';
    case 5:
        return '5';
    case 6:
        return '6';
    case 7:
        return '7';
    case 8:
        return '8';
    case 9:
        return '9';
    case 10:
        return 'A';
    case 11:
        return 'B';
    case 12:
        return 'C';
    case 13:
        return 'D';
    case 14:
        return 'E';
    case 15:
        return 'F';
    default:
        cout << "Somehow we got here.\n";
        return 'Z';
    }
}

bool CheckInput(int argc, char* args[]) {
    if (args[1][1] == 'h') {
        PrintMenu();
        return false;
    }
    else if (argc < 5) {
        cout << "Error: Not enough information.\n Please enter \"numcon -h\" for a list of valid flags and examples";
        PrintMenu();
        return false;
    }
    else if (argc > 5) {
        cout << "Error: Too much information.\n Please enter \"numcon -h\" for a list of valid flags and examples";
        PrintMenu();
        return false;
    }
    else {
        return true;
    }
}

//main logic to create intermediate value
void ConvertValue(char flag1, char flag2, char* value)
{
    int factor = GetFactor(flag1);
    int total = 0;

    if (factor != -1) {
        for (int i = 0; i < strlen(value); i++) {
            int temp = Chart(value[i]);
            if (temp == -1) {
                return;
            }
            total = (total * factor) + Chart(value[i]);
        }
    }

    factor = GetFactor(flag2);
    string output = "";
    if (factor != -1) {
        int size = 0; //storing size as separate int to avoid time complexity of .size() in stack
        stack<char> stack;
        for (int i = 0; i < strlen(value); i++) {
            if (total % factor == 0) {
                stack.push('0');
                
            }
            else {
                stack.push(Chart2(total % factor));
            }
            size++;
            total /= factor;
        }
        for (int i = 0; i < size; i++) {
            output.push_back(stack.top());
            stack.pop();
        }
    }

    
    cout << output;
}

int GetFactor(char flag) {
    switch (flag) {
    case 'b':
        return 2;
    case 'd':
        return 10;
    case 'h':
        return 16;
    case 'o':
        return 8;
    default:
        cout << "Error: Invalid flag, please enter \"numcon -h\" for a list of valid flags\n";
        return -1;
    }
}

void PrintMenu() {

}


