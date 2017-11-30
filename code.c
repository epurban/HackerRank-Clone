#include <iostream>
#include <stdlib.h>

using namespace std;

int main(){
    for (int i=1; i<10; i++) {
        if (i > 5) {
            cout << 10-i;
        } else {
            cout << i;
        }
    }
	return 0;
}