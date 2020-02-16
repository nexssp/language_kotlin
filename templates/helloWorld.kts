//  Nexss PROGRAMMER 2.0.0 - Kotlin
// Default template for JSON Data
// STDIN
// TODO: implement some JSON library, now is done with string replace.
System.setProperty("file.encoding", "UTF-8");
var NexssStdin = ""
NexssStdin = readLine() ?: ""

// To add standard JSON parser (Klaxon ?)
NexssStdin = NexssStdin.replace("}",",\"helloFromKotlin\":\""+KotlinVersion.CURRENT+"\"}")

println(NexssStdin)
