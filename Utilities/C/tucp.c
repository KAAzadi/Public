#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

//prototypes
void Copy(char *sourceFile, char *destination);
void CopyExe(char* source, char* destination);
void CopyTxt(char* source, char* destination);

//defines and constants
#define MAX_PATH 260
#define BUFFER_SIZE 100
#define CHUNK_SIZE 1
#define BUFFER_MAX 99

int main(int argc, char *argv[])
{
    //if not enough arguments are presented, exits out with an error
    if(argc<3)
    {
        printf("Error: Not enough arguments\n");
        exit(EXIT_FAILURE);
    }
    //if enough arguments are presented, prepare information to be passed through function easily
    else
    {
        int i;
        struct stat file;
        //checks that all source files exist
        for (i=1;i<argc-1;i++)
        {
            if (stat(argv[i], &file) == -1)
            {
                printf("Error: %s not found\n", argv[i]);
                exit(EXIT_FAILURE);
            }
        }
        //if directory exists
        if (argc > 3)
        {
            if (stat(argv[argc - 1], &file) == -1)
            {
                printf("Error: %s not found\n", argv[argc-1]);
                exit(EXIT_FAILURE);
            }
            else if (S_ISDIR(file.st_mode) == 0)
            {
                printf("Error: %s is not a directory\n", argv[argc - 1]);
                exit(EXIT_FAILURE);
            }
        }

        for(i=1;i<argc-1;i++)
        {
            Copy(argv[i],argv[argc-1]);
        }
    }

    return 0;
}

//This function copies all files over from the source location to destination
//sourceFiles is an array of all files that need to be copied
//destination is the location (directory or filename) that files are copied to
void Copy(char *sourceFile, char *destination)
{
    //destTemp is a temporary char* so original destination variable doesn't get modified if it's a directory
    char destTemp[MAX_PATH] = "";
    strcat(destTemp,destination);

    struct stat file;

    //get the information of destination
    stat(destination, &file);

    //after file has been populated, check to see if directory(0)
    if(S_ISDIR(file.st_mode)!=0)
    {
        strcat(destTemp, "/");
        strcat(destTemp, sourceFile);
    }

    //Checks if file is an executable
    if (file.st_mode && S_IXUSR)
    {
        //runs the version of file reading for executables
        CopyExe(sourceFile, destTemp);
    }
    else
    {
        //runs the version of file reading for non-executables
        CopyTxt(sourceFile, destTemp);
    }
}

void CopyExe(char* sourceFile, char* destination)
{

    FILE* source = fopen(sourceFile, "rb");
    if (source == NULL)
    {
        printf("Error: File not found\n");
        exit(EXIT_FAILURE);
    }

    //Creates target after we know the file exists, that way less memory used for a failed attempt
    FILE* target = fopen(destination, "a+w");

    //checks for error while opening/creating file
    if (target == NULL)
    {
        printf("Error with creating destination file\n");
        exit(EXIT_FAILURE);
    }

    //get the content from the source file, and copy over to endpoint
    char buffer[BUFFER_SIZE];
    int numRead, numWritten;
    //loop runs as long as source not at end of file
    while (feof(source) == 0)
    {
        //memset reads very fast as it sets memory byte by byte
        memset(buffer, 0, sizeof(buffer));
        //read bytes from file into buffer
        numRead = fread(buffer, CHUNK_SIZE, BUFFER_MAX, source);

        //check to make sure no errors in target file stream
        if (ferror(target) != 0)
        {
            printf("Error: Unable to read %s\n",sourceFile);
            //break used to ensure files are closed properly
            break;
        }

        //write bytes from buffer into file.
        numWritten = fwrite(buffer, sizeof(char), numRead, target);

        //makes sure number read is same as number written
        if (numRead != numWritten)
        {
            printf("Error: problem with writing %s\n", destination);
            //break used to ensure files are closed properly
            break;
        }
    }
    //changing permissions of the newly created executable to match the original
    struct stat file;
    //retrieve all file information
    fstat(fileno(source), &file);
    //set target user ID group ID to be the same
    fchown(fileno(target), file.st_uid, file.st_gid);
    //set target permissions to be the same
    fchmod(fileno(target), file.st_mode);

    fclose(source);
    fclose(target);
}

void CopyTxt(char* sourceFile, char* destination)
{
    FILE* source = fopen(sourceFile, "r");

    if (source == NULL)
    {
        printf("Error: File not found\n");
        exit(EXIT_FAILURE);
    }

    //Creates target after we know the file exists, that way less memory used for a failed attempt
    FILE* target = fopen(destination, "w");

    //checks for error while opening/creating file
    if (target == NULL)
    {
        printf("Error with creating destination file\n");
        exit(EXIT_FAILURE);
    }

    //get the content from the source file, and copy over to destination
    int content = fgetc(source);
    while (content != EOF)
    {
        fputc(content, target);
        content = fgetc(source);
    }
    fclose(source);
    fclose(target);
}
