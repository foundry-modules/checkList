SRC_DIR = source
BUILD_DIR = build
UGLIFY = uglifyjs --unsafe -nc
FOUNDRY_DIR = ../..
PRODUCTION_DIR = ${FOUNDRY_DIR}/scripts
DEVELOPMENT_DIR = ${FOUNDRY_DIR}/scripts_
MODULARIZE = ${FOUNDRY_DIR}/build/modularize
BASE_FILES = ${SRC_DIR}/jquery.checkList.js

all: premake body min foundry

premake:
	mkdir -p ${BUILD_DIR}

body:
	@@cat ${BASE_FILES} > ${BUILD_DIR}/jquery.checkList.js

min:
	${UGLIFY} ${BUILD_DIR}/jquery.checkList.js > ${BUILD_DIR}/jquery.checkList.min.js

foundry:
	${MODULARIZE} -n "checkList" ${BUILD_DIR}/jquery.checkList.js > ${DEVELOPMENT_DIR}/checkList.js
	${UGLIFY} ${DEVELOPMENT_DIR}/checkList.js > ${PRODUCTION_DIR}/checkList.js




