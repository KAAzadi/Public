#define _GNU_SOURCE

#include <dirent.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>

//prototypes
void RecScan(char* pathName, int space);
void ListFiles(char* pathName);

//defines needed for recursive scan
#define INITIAL_INDENTATION 1
#define EXPECTED_ARGUMENTS 2
#define _MAX_PATH 260
const char *INDENT_STRING = "  ";

//This program takes in a directory name as the only possible argument. 
//If there is more than one argument, then treat command as if there were no arguments
int main(int argc, char *argv[])
{
    char pathName[_MAX_PATH];

    //one argument test
    //If success, lists all files and directories recursively
    if(argc==EXPECTED_ARGUMENTS)
    {
	    strcpy(pathName,argv[1]);
	    printf("[[%s]]\n",pathName);
        RecScan(pathName, INITIAL_INDENTATION);
        /*
        tuls wrongDir
        [[wrongDir]]
          Error: directory not found
        */
    }

    //this occurs no matter how many arguments
    //lists all files in current directory
    strcpy(pathName,".");
    ListFiles(pathName);

    return 0;
}

//recursively scans for other directories and files in those directories
//pathName is the directory to be scanned
//indentation is the number of spaces required for formatting results 
void RecScan(char* pathName, int indentation)
{
    struct dirent **fileList;

    //success stores the number of files/directories found within the scanned directory
    int success = scandir(pathName, &fileList, NULL, alphasort);

    //determines whether directory failed
    if (success <= 0)
    {
        //If initial entry does not exist, print the error and exit program
	    if(indentation == INITIAL_INDENTATION && success == -1)
	    {
	        perror("scandir");
	        exit(EXIT_FAILURE);
	    }
        else
        {
            //In case there is an empty directory, this allows us to go backwards
            return;
        }
    }

    //this while loop goes backwards through the exisiting files and directories within fileList, until reaching 0 (the false state)
    while(success--)
    {
	    //This statement checks to not access current directory (infinite loop case), previous directory (infinite loop case), or hidden files(to mirror the linux command "ls")
        if(strcmp(fileList[success]->d_name, "..") != 0 && 
           strcmp(fileList[success]->d_name, ".") != 0 && 
           fileList[success]->d_name[0] != '.')
	    {            
            //pathCopy allows us to continue down the recursive path, without overwriting the char* of previous path
            char pathCopy[_MAX_PATH];
            
            int i = 0;
	        
	        for(i=0; i<indentation; i++)
	        {
	            printf("%s",INDENT_STRING);
	        }
            
            printf("%s\n",fileList[success]->d_name);

	        strcpy(pathCopy, pathName);
	        strcat(pathCopy, "/");
	        strcat(pathCopy, fileList[success]->d_name);
	        RecScan(pathCopy, indentation+1);
	    }

        free(fileList[success]);
    }
}

//This function looks for and displays files in current directory, does not display anything else
//pathName is the name of the path to current directory
void ListFiles(char *pathName)
{
    struct dirent **fileList;
    struct stat file;

    int success = scandir(pathName, &fileList, NULL, alphasort);

    //check to see whether directory does not exist
    if (success == -1)
    {
	    perror("scandir");
	    exit(EXIT_FAILURE);
    }
    // this while loop goes backwards through the exisiting files and directories within fileList, until reaching 0 (the false state)
    //This loop checks to see whether the file being looked at is a file or something else
    while(success--)
    { 
        //This statements checks if the current item being analyzed exists
        //if not a file, exit
	    if(stat(fileList[success]->d_name,&file) == -1)
	    {
	        perror("errno");
	        exit(EXIT_FAILURE);
	    }
        //If item exists, this statement checks to see if it's not a hidden file or directory (as would be seen with the "find" command in linux)
        else if(fileList[success]->d_name[0] != '.')
	        {
                printf("%s\n",fileList[success]->d_name);
	        }

            free(fileList[success]);
       }

}

