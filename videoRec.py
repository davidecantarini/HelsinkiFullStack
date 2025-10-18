from ultralytics import YOLO
import cv2

# Modello leggero per CPU
model = YOLO("yolov8n.pt")

cap = cv2.VideoCapture(1)  # webcam

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model.predict(frame, conf=0.5)  # CPU inference
    annotated_frame = results[0].plot()

    cv2.imshow("YOLOv8 Webcam", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):  # premi 'q' per uscire
        break

cap.release()
cv2.destroyAllWindows()
