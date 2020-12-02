package Models

import play.api.libs.json.Json

case class User(userName:String, password:String)
case object User{
  implicit val format = Json.format[User]
}
