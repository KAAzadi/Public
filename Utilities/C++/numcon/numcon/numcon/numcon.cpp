// numcon.cpp : This file contains the 'main' function. Program execution begins and ends there.
//
#define BIN 2
#define DEC 10
#define HEX 16
#define OCT 8

#include <iostream>
using namespace std;

int main(int argc, char* args[])
{
    SwitchBoard(argc, args[1][1], args[3][1], args[2]);
}

void SwitchBoard(int num, char flag1, char flag2, char* value) 
{
    switch (flag1) {
    case 'b':
        ConvertValue(value, BIN);
        break;
    case 'd':
        ConvertValue(value, DEC);
        break;
    case 'h':
        ConvertValue(value, HEX);
        break;
    case 'o':
        ConvertValue(value, OCT);
        break;
    }

    switch (flag2) {
    case 'a':
        break;
    case 'b':
        break;
    case 'd':
        break;
    case 'h':
        break;
    case 'o':
        break;
    }
}

int ConvertValue(char* value, int factor)
{
    return -1;
}

//provides a  simple digit conversion for all 16 potential values
int Chart(char value) {
    switch (value) {
    case '0':
        break;
    case  '1':
        break;
    case '2':
        break;
    case '3':
        break;
    case '4':
        break;
    case '5':
        break;
    case '6':
        break;
    case '7':
        break;
    case '8':
        break;
    case '9':
        break;
    case 'a':
    case 'A':
        break;
    case 'b':
    case 'B':
        break;
    case 'c':
    case 'C':
        break;
    case 'd':
    case 'D':
        break;
    case 'e':
    case 'E':
        break;
    case 'f':
    case 'F':
        break;
    }
}