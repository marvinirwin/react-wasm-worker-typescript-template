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
    // reads text until newline
    fscanf(fp, "%s", dest);
    fclose(fp);
}

int main() {
    char cwd[1024];
    getcwd(cwd, sizeof(cwd));
    printf("Current working dir: %s\n", cwd);

    char c[1000];
    // Read our data
    readFile("/work/input.txt", c);

    printf("%s\n", c);

    // Simulate processing time...
    emscripten_sleep(5000);

    // Write our data!
    writeFile("/work/output.txt", c);


    return 0;
}