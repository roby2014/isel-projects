plugins {
    // Apply the org.jetbrains.kotlin.jvm Plugin to add support for Kotlin.
    id("org.jetbrains.kotlin.jvm") version "1.7.20"
    id("org.jetbrains.compose") version "1.2.1"
}

repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}

dependencies {
    implementation(compose.desktop.currentOs)

    implementation(project(":checkers-model"))
    implementation(project(":storage"))

    //Access to MongoDB
    implementation("org.litote.kmongo:kmongo:4.7.2")
    implementation("org.apache.logging.log4j:log4j-slf4j-impl:2.17.1")
    //Access to coroutines of MongoDB
    implementation("org.litote.kmongo:kmongo-coroutine:4.7.2")


    // Align versions of all Kotlin components
    implementation(platform("org.jetbrains.kotlin:kotlin-bom"))

    // Use the Kotlin JDK 8 standard library.
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // Use the Kotlin test library.
    testImplementation("org.jetbrains.kotlin:kotlin-test")

    // Use the Kotlin JUnit integration.
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")
}

compose.desktop {
    application {
        mainClass = "isel.leic.tds.checkers.gui.AppKt"
    }
}