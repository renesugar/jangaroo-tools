package net.jangaroo.jooc.cli;

import net.jangaroo.jooc.config.JoocConfiguration;
import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;

import java.io.StringWriter;

import static org.kohsuke.args4j.ExampleMode.REQUIRED;

/**
 * Parses the jooc command line to produce a {@link JoocConfiguration}.
 */
public class JoocCommandLineParser {

  @SuppressWarnings({"AccessStaticViaInstance"})
  public JoocConfiguration parse(String[] args) throws CommandLineParseException {

    JoocConfiguration config = new JoocConfiguration();

    CmdLineParser parser = new CmdLineParser(config);
    try {
      // parse the arguments.
      parser.parseArgument(args);
    } catch (CmdLineException e) {
      StringBuilder msg = new StringBuilder();
      // if there's a problem in the command line,
      // you'll get this exception. this will report
      // an error message.
      msg.append(e.getMessage());
      msg.append("\n");
      msg.append("java Jooc [options...] source files...\n");
      // print the list of available options
      StringWriter writer = new StringWriter();
      parser.printUsage(writer, null);
      msg.append(writer.getBuffer());
      msg.append("\n");
      // print option sample. This is useful some time
      msg.append("  Example: java Jooc").append(parser.printExample(REQUIRED));
      msg.append("\n");
      throw new CommandLineParseException(msg.toString(), -1);
    }

    if (config.isHelp()) {
      parser.printUsage(System.out);
      return null;
    }

    if (!config.getOutputDirectory().exists()) {
      throw new IllegalArgumentException("destination directory does not exist: " + config.getOutputDirectory().getAbsolutePath());
    }

    if (config.getApiOutputDirectory() != null &&!config.getApiOutputDirectory().exists()) {
        throw new IllegalArgumentException("destination directory for API stubs does not exist: " + config.getApiOutputDirectory().getAbsolutePath());
    }
    if (config.isVerbose()) {
      /*
      System.out.println("enableassertions=" +  enableAssertions);
      */
      System.out.println("-genarateapi: " + config.isGenerateApi()); // NOSONAR this is a cmd line tool
      System.out.println("-g option values:"); // NOSONAR this is a cmd line tool
      System.out.println("debugMode=" + config.getDebugMode()); // NOSONAR this is a cmd line tool
    }

    return config;
  }
}