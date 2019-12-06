/*
 * Copyright 2011 The Emscripten Authors.  All rights reserved.
 * Emscripten is available under two separate licenses, the MIT license and the
 * University of Illinois/NCSA Open Source License.  Both these licenses can be
 * found in the LICENSE file.
 */

#include <stdio.h>
#include <emscripten.h>

void adx_store_data(const char *filepath, const char *data)
{
    FILE *fp = fopen(filepath, "ab");
    if (fp != NULL)
    {
        fputs(data, fp);
        fclose(fp);
    }
}

int main() {

    char c[1000];
    FILE *fptr;
    if ((fptr = fopen("big_blob.txt", "r")) == NULL)
    {
        printf("Error! opening file");
        // Program exits if file pointer returns NULL.
        return 1;
    }
    // reads text until newline
    fscanf(fptr,"%[^\n]", c);
    printf("Data from the file:\n%s", c);
    fclose(fptr);
    adx_store_data("./output.txt", c);


    return 0;
}