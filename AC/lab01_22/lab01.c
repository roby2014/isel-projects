// Multiplication of two natural numbers, using the consecutive sums algorithm

#include <stdio.h>
#include <stdint.h>

void main() {
    int M = 2, m = 10; // testing purposes
    int16_t p = 0;

    if (M != 0) {
        while (m > 0) {
            printf("while\n");
            p = p + M;
            m --;
        }
    }
}