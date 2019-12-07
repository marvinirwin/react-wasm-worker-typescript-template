/*
 * Copyright 2011 The Emscripten Authors.  All rights reserved.
 * Emscripten is available under two separate licenses, the MIT license and the
 * University of Illinois/NCSA Open Source License.  Both these licenses can be
 * found in the LICENSE file.
 */

#include <stdio.h>
#include <emscripten.h>
#include <unistd.h>

void writeFile(const char *filepath, const char *data) {
    FILE *fp = fopen(filepath, "ab");
    if (fp != NULL) {
        fputs(data, fp);
        fclose(fp);
    } else {
        printf("Error writing file\n");
    }
}

void readFile(const char *filepath, char *dest) {
    FILE *fp;
    if ((fp = fopen(filepath, "r")) == NULL) {
        printf("Error! opening file\n");
        // Program exits if file pointer returns NULL.
        return;
    }
    int i = 0;
    while(fscanf(fp, "%c", &dest[i]) != EOF)
    {
        i = i + 1;
    }

    fclose(fp);
}

int main() {
    char c[1000];
    // Read our data
    readFile("input.txt", c);

    printf("%s\n", c);

    // Write our data!
    writeFile("output.txt", c);

    return 0;
}