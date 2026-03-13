import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import requests
from dotenv import load_dotenv
from twilio.rest import Client

load_dotenv()


def send_email(
    to_email: str,
    subject: str,
    body: str,
    html_body: Optional[str] = None,
    from_email: Optional[str] = None,
) -> dict:
    """
    Send an email using SMTP (Gmail or custom SMTP server).

    Args:
        to_email: Recipient email address
        subject: Email subject
        body: Plain text email body
        html_body: Optional HTML version of the email
        from_email: Optional sender email (uses env SENDER_EMAIL if not provided)

    Returns:
        dict: Status response with 'success' and 'message' keys
    """
    try:
        from_email = from_email or os.getenv("SENDER_EMAIL")
        smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", 587))
        smtp_username = os.getenv("SMTP_USERNAME")
        smtp_password = os.getenv("SMTP_PASSWORD")

        if not all([from_email, smtp_username, smtp_password]):
            return {
                "success": False,
                "message": "Missing email configuration (SENDER_EMAIL, SMTP_USERNAME, SMTP_PASSWORD)"
            }

        # Create email message
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = from_email
        msg["To"] = to_email

        # Attach plain text version
        msg.attach(MIMEText(body, "plain"))

        # Attach HTML version if provided
        if html_body:
            msg.attach(MIMEText(html_body, "html"))

        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(from_email, to_email, msg.as_string())

        return {
            "success": True,
            "message": f"Email sent successfully to {to_email}"
        }

    except Exception as e:
        return {
            "success": False,
            "message": f"Failed to send email: {str(e)}"
        }


def _send_sms_twilio(phone_number: str, message: str) -> dict:
    """
    Send an SMS via Twilio.

    Args:
        phone_number: Recipient phone number (with country code, e.g., +91XXXXXXXXXX)
        message: SMS message content

    Returns:
        dict: Status response with 'success', 'message', and 'sid' keys
    """
    try:
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        twilio_phone = os.getenv("TWILIO_PHONE_NUMBER")

        if not all([account_sid, auth_token, twilio_phone]):
            return {
                "success": False,
                "message": "Missing Twilio configuration (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)"
            }

        client = Client(account_sid, auth_token)
        sms = client.messages.create(
            body=message,
            from_=twilio_phone,
            to=phone_number
        )

        return {
            "success": True,
            "message": f"SMS sent successfully to {phone_number}",
            "sid": sms.sid
        }

    except Exception as e:
        return {
            "success": False,
            "message": f"Failed to send SMS via Twilio: {str(e)}"
        }


def send_sms(
    phone_number: str,
    message: str,
    provider: str = "twilio"
) -> dict:
    """
    Send an SMS to a given phone number using Twilio.

    Args:
        phone_number: Recipient phone number (with country code, e.g., +91XXXXXXXXXX)
        message: SMS message content
        provider: SMS provider ('twilio' - currently only supported)

    Returns:
        dict: Status response with 'success' and 'message' keys
    """
    try:
        if provider.lower() == "twilio":
            return _send_sms_twilio(phone_number, message)
        else:
            return {
                "success": False,
                "message": f"Unknown SMS provider: {provider}. Use 'twilio'"
            }

    except Exception as e:
        return {
            "success": False,
            "message": f"Failed to send SMS: {str(e)}"
        }


def send_whatsapp(
    phone_number: str,
    message: str,
    media_url: Optional[str] = None
) -> dict:
    """
    Send a WhatsApp message via Twilio.

    Important:
    - To initiate a conversation, only pre-approved templated messages can be sent
    - Once a user sends a message to you, a 24-hour session window opens for free-form messages
    - Use the sandbox for testing: https://www.twilio.com/console/sms/whatsapp/learn

    Args:
        phone_number: Recipient WhatsApp number (with country code, e.g., +91XXXXXXXXXX)
        message: Message content
        media_url: Optional URL to media (image, document, etc.)

    Returns:
        dict: Status response with 'success', 'message', and 'sid' keys
    """
    try:
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        twilio_whatsapp = os.getenv("TWILIO_WHATSAPP_NUMBER")

        if not all([account_sid, auth_token, twilio_whatsapp]):
            return {
                "success": False,
                "message": "Missing Twilio WhatsApp configuration (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER)"
            }

        client = Client(account_sid, auth_token)

        # Format WhatsApp numbers with 'whatsapp:' prefix
        from_whatsapp = f"whatsapp:{twilio_whatsapp}"
        to_whatsapp = f"whatsapp:{phone_number}"

        whatsapp_msg = client.messages.create(
            body=message,
            from_=from_whatsapp,
            to=to_whatsapp,
            media_url=[media_url] if media_url else None
        )

        return {
            "success": True,
            "message": f"WhatsApp message sent successfully to {phone_number}",
            "sid": whatsapp_msg.sid
        }

    except Exception as e:
        return {
            "success": False,
            "message": f"Failed to send WhatsApp message: {str(e)}"
        }


# Export functions
__all__ = ["send_email", "send_sms", "send_whatsapp"]


if __name__ == "__main__":
    """Test notification sending functionality."""

    print("=" * 60)
    print("Testing SMS Notification")
    print("=" * 60)

    # sms_result = send_sms(
    #     phone_number="+917506071608",
    #     message="Hello from Hacknova! This is a test SMS."
    # )

    # print(f"Status: {sms_result['success']}")
    # print(f"Message: {sms_result['message']}")
    # if 'sid' in sms_result:
    #     print(f"SMS ID: {sms_result['sid']}\n")

    # print("=" * 60)
    # print("Testing WhatsApp Notification")
    # print("=" * 60)

    whatsapp_result = send_whatsapp(
        phone_number="+917506071608",
        message="Hello from Hacknova! This is a test WhatsApp message."
    )

    print(f"Status: {whatsapp_result['success']}")
    print(f"Message: {whatsapp_result['message']}")
    if 'sid' in whatsapp_result:
        print(f"WhatsApp Message ID: {whatsapp_result['sid']}\n")

    print("=" * 60)
    print("Test Summary")
    print("=" * 60)
    print(f"SMS sent: {'✓' if sms_result['success'] else '✗'}")
    print(f"WhatsApp sent: {'✓' if whatsapp_result['success'] else '✗'}")
    print("=" * 60)
