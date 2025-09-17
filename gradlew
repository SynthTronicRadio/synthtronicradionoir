jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Grant execute permission for gradlew
        run: chmod +x ./gradlew

      - name: Build
        run: ./gradlew assembleDebug
