path_to_name () {
    str=$1
    part=${str#*views/} # remove path above views
    part=${part//\//_}   # replace all / with _
    part=${part/.mustache/_tpl}
    echo "$part"
}

embrace () {
    echo "<script id=\"$1\" type=\"x-tmpl-mustache\">$2</script>"
}

scripts=""
for template in $(find ./ -name *mustache); do
    scripts="$scripts$(embrace $(path_to_name $template) "$(cat $template)")"
done

##
#
rm -rf build
mkdir build
#
index=$(cat src/index.html)
echo "${index/§.templates/$scripts}" > build/index.html
#
mkdir -p build/app/lib
cp -R src/app/lib/* build/app/lib/
cp src/app/main.js build/app/