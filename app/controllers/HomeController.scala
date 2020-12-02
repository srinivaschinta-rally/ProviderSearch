package controllers

import java.security.MessageDigest
import java.time.Clock

import Actions.UserAction
import Models.User
import javax.inject._
import pdi.jwt.{JwtClaim, JwtJson}
import play.api.Configuration
import play.api.libs.json.Json
import play.api.mvc._
import utils.PasswordUtil


@Singleton
class HomeController @Inject()(cc: ControllerComponents, config: Configuration,userAction: UserAction) extends AbstractController(cc) {

  def signin() = Action(parse.json[User]) { request =>

    implicit val clock: Clock = Clock.systemUTC
    val user = request.body
    val authenticated = PasswordUtil.users.get(user.userName).map(
      PasswordUtil.checkPassword(user.password, _)
    ).getOrElse(false)

    if (authenticated) {
      val claim = Json.obj(("user", user.userName))
      Ok(JwtJson.encode(JwtClaim(claim.toString()).issuedNow.expiresIn(1200)))
    } else {
      Unauthorized("Sorry dude.. It is a strict NO without a proper id card.")
    }

  }

  def register() = Action(parse.json[User]) { request =>
    val user = request.body
    //This registration is a temp solution. This should be replaced by better persistance mechanism like db
    PasswordUtil.users(user.userName) = PasswordUtil.hashPassword(user.password,"1234qwer".getBytes())
    Ok("Registration is successful")
  }

  def search(text:String)  = userAction {
    val searchText = text.toLowerCase
    if(text.length >2)
      Ok(Json.toJson(Models.Provider.allProviders.filter(p => p.name.toLowerCase.contains(searchText) || p.specialty.toLowerCase.contains(searchText) )))
    else
      Ok(Json.toJson(Models.Provider.allProviders))
  }

  def providers = userAction {
    request => Ok(Json.toJson(Models.Provider.allProviders))
  }


  def appSummary = userAction { request =>
    Ok(Json.obj("content" -> s"Blah..Blah.."))
  }
}
