package utils

import java.security.SecureRandom
import java.util.Base64
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec


object PasswordUtil {

  private def pbkdf2(password: String, salt: Array[Byte], iterations: Int): Array[Byte] = {
    val keySpec = new PBEKeySpec(password.toCharArray, salt, iterations, 256)
    val keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256")
    keyFactory.generateSecret(keySpec).getEncoded
  }

  def hashPassword(password: String, salt: Array[Byte]): String = {
    val DefaultIterations = 10000
    val random = new SecureRandom()
    val salt = new Array[Byte](16)
    random.nextBytes(salt)
    val hash = pbkdf2(password, salt, DefaultIterations)
    val salt64 = Base64.getEncoder.encodeToString(salt)
    val hash64 = Base64.getEncoder.encodeToString(hash)

    s"$DefaultIterations:$hash64:$salt64"
  }

  def checkPassword(password: String, passwordHash: String): Boolean = {
    passwordHash.split(":") match {
      case Array(it, hash64, salt64) if it.forall(_.isDigit) =>
        val hash = Base64.getDecoder.decode(hash64)
        val salt = Base64.getDecoder.decode(salt64)

        val calculatedHash = pbkdf2(password, salt, it.toInt)
        calculatedHash.sameElements(hash)

      case other => sys.error("Bad password hash")
    }
  }


  //Dont hate me here. This has to be replaced by the db. This is a tweak.
  lazy val users = scala.collection.mutable.Map[String,String]("testUser" -> "10000:wLFt0Pnsxk3A5/f6BiSYdfBIhhf+u06nf14mM/StvI8=:cxR1S335O3OxHdofrGH+bw==")

}
