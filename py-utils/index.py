import sys
import io

file = sys.argv[1]

f = io.open(file, mode='r').read()
print(str(f))
