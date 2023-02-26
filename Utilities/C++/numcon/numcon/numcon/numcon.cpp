// numcon.cpp : This file contains the 'main' function. Program execution begins and ends there.
//
#define BIN 2
#define DEC 10
#define HEX 16
#define OCT 8

#define FAILURE -1

#include <iostream>

using namespace std;

//prototypes
int Chart(char value);
bool CheckInput(int argc, char* args[]);
int ConvertValue(char* value, int factor);
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

bool CheckInput(int argc, char* args[]) {
    if (args[1][1] == 'h') {
        PrintMenu();
    }
    else if (argc < 5) {
        cout << "Error: Not enough information\n Please enter \"numcon -h\" for a list of valid flags ";
        PrintMenu();
    }
}

//main logic to create intermediate value
int ConvertValue(char flag1, char flag2, char* value)
{
    int factor;
    int total = 0;
    for (int i = 0; i < strlen(value); i++) {
        int temp = Chart(value[i]);
        if (temp == -1) return FAILURE;
        total = (total * factor) + Chart(value[i]);
    }
    return total;
}


