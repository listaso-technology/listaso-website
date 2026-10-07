import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lsbuild
root, written = lsbuild.build(preview="--preview" in sys.argv)
print(root, len(written), "pages")
